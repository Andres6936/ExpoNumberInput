import React, {ComponentPropsWithRef, Fragment, useCallback, useMemo} from "react";
import {Pressable, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle} from "react-native";
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react-native";

import * as Slot from './Slot'
import {useNumericInput} from "./useNumericInput";
import {ComponentPropsWithAsChild} from "./types";


export type Props = {
    value: number
    defaultValue?: number | null
    minValue?: number | null
    maxValue?: number | null
    step?: number
    valueType?: 'integer' | 'real'
    iconSize?: number
    borderColor?: string
    iconStyle?: StyleProp<TextStyle>,
    totalWidth?: number
    separatorWidth?: number
    type?: 'plus-minus' | 'up-down'
    rounded?: boolean
    textColor?: string
    containerStyle?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<TextStyle>,
    upDownButtonsBackgroundColor?: string
    rightButtonBackgroundColor?: string
    leftButtonBackgroundColor?: string
    totalHeight?: number
    onChange: (value: number) => void
    onLimitReached?: (isMax: boolean, msg: string) => void
    editable?: boolean
    validateOnBlur?: boolean
    extraTextInputProps?: object,
    onBlur?: () => void,
    onFocus?: () => void,
}

export function NumericField(
    {
        value: propValue = 0,
        borderColor = '#d4d4d4',
        iconStyle: propIconStyle = {},
        containerStyle = {},
        inputStyle: propInputStyle = {},
        valueType = 'integer',
        minValue = null,
        maxValue = null,
        step = 1,
        editable = true,
        extraTextInputProps = {},
        ...props
    }: Props) {

    const {
        ref,
        valueAsText,
        onChange,
        onFocus,
        onBlur,
    } = useRootContext()

    return (
        <TextInput
            {...extraTextInputProps}
            editable={editable}
            returnKeyType='done'
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType='numeric'
            value={valueAsText}
            onChangeText={onChange}
            ref={ref}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    )
}

type IRootContext = {
    ref: React.RefObject<TextInput | null>,
    maxValue: number | null,
    minValue: number | null,
    valueAsText: string,
    valueAsNumber: number,
    increment: () => void,
    decrement: () => void,
    onChange: (value: string) => void,
    onFocus: () => void,
    onBlur: () => void,
}

const RootContext = React.createContext<IRootContext | null>(null);

type RootProps = ComponentPropsWithAsChild<typeof View> & {
    value: number
    step?: number
    minValue?: number | null
    maxValue?: number | null
    valueType?: 'integer' | 'real'
    validateOnBlur?: boolean
}

export function Root(
    {
        asChild,
        value = 0,
        step = 1,
        minValue = null,
        maxValue = null,
        valueType = 'integer',
        validateOnBlur = true,
        ...viewProps
    }: RootProps
) {
    const {
        ref,
        valueAsText,
        valueAsNumber,
        increment,
        decrement,
        onChange,
        onFocus,
        onBlur,
    } = useNumericInput({
        step,
        value,
        minValue,
        maxValue,
        valueType,
        validateOnBlur,
    })

    const Component = asChild ? Slot.View : View;
    return (
        <RootContext value={{
            ref,
            maxValue,
            minValue,
            valueAsText,
            valueAsNumber,
            increment,
            decrement,
            onChange,
            onFocus,
            onBlur
        }}>
            <Component {...viewProps} />
        </RootContext>
    )
}

function useRootContext() {
    const context = React.useContext(RootContext);
    if (!context) {
        throw new Error('Input compound components cannot be rendered outside the Root component');
    }
    return context;
}

export function Container({asChild, ...props}: ComponentPropsWithAsChild<typeof View>) {
    const Component = asChild ? Slot.View : View;
    return (
        <Component {...props} />
    )
}

type AnyComponent = React.ComponentType<any>

type ComponentStatus = {
    isMaxReached: boolean,
    isMinReached: boolean,
}

type CallbackComponentStatus<T extends AnyComponent> = (status: ComponentStatus) => React.ComponentProps<T>

type ActionProps<T extends AnyComponent> = ComponentPropsWithRef<typeof Pressable> & {
    Icon: T,
    iconProps: React.ComponentProps<T> | CallbackComponentStatus<T>,
    viewProps: React.ComponentProps<typeof View>,
}

function useActionProps<T extends AnyComponent>(args: Pick<ActionProps<T>, 'iconProps'>) {
    const {valueAsNumber, maxValue, minValue, increment, decrement} = useRootContext()

    const withIconProps = useMemo(() => {
        if (typeof args.iconProps === 'function') {
            return (args.iconProps as CallbackComponentStatus<T>)({
                isMaxReached: valueAsNumber === maxValue,
                isMinReached: valueAsNumber === minValue,
            })
        }

        return args.iconProps
    }, [args.iconProps, valueAsNumber, maxValue, minValue]);

    return {
        increment,
        decrement,
        iconProps: withIconProps,
    }
}

export function IncrementAction<T extends AnyComponent>({Icon, ...props}: ActionProps<T>) {
    const {iconProps, increment} = useActionProps<T>({
        iconProps: props.iconProps,
    })

    return (
        <Pressable onPress={increment} {...props}>
            <View {...props.viewProps}>
                <Icon {...iconProps} />
            </View>
        </Pressable>
    )
}

export function DecrementAction<T extends AnyComponent>({Icon, ...props}: ActionProps<T>) {
    const {iconProps, decrement} = useActionProps<T>({
        iconProps: props.iconProps,
    })

    return (
        <Pressable onPress={decrement} {...props}>
            <View {...props.viewProps}>
                <Icon {...iconProps} />
            </View>
        </Pressable>
    )
}


const style = StyleSheet.create({
    seprator: {
        backgroundColor: 'grey',
        height: 80,
    },
    inputContainerUpDown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderColor: 'grey',
        borderWidth: 1
    },
    inputContainerPlusMinus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    inputUpDown: {
        textAlign: 'center',
        padding: 0

    },
    inputPlusMinus: {
        textAlign: 'center',
        padding: 0
    },
    icon: {
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    upDown: {
        alignItems: 'center',
        paddingRight: 15
    }
})