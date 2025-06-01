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
    reachMaxIncIconStyle?: StyleProp<ViewStyle>,
    reachMaxDecIconStyle?: StyleProp<ViewStyle>,
    reachMinIncIconStyle?: StyleProp<ViewStyle>,
    reachMinDecIconStyle?: StyleProp<ViewStyle>,
    extraTextInputProps?: object,
    onBlur?: () => void,
    onFocus?: () => void,
}

export function NumericField(
    {
        value: propValue = 0,
        iconSize = 30,
        borderColor = '#d4d4d4',
        iconStyle: propIconStyle = {},
        totalWidth = 220,
        separatorWidth = 1,
        type = 'plus-minus',
        rounded = false,
        textColor = 'black',
        containerStyle = {},
        inputStyle: propInputStyle = {},
        valueType = 'integer',
        minValue = null,
        maxValue = null,
        step = 1,
        upDownButtonsBackgroundColor = 'white',
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        editable = true,
        validateOnBlur = true,
        reachMaxIncIconStyle = {},
        reachMaxDecIconStyle = {},
        reachMinIncIconStyle = {},
        reachMinDecIconStyle = {},
        onLimitReached = (isMax, msg) => {
        },
        extraTextInputProps = {},
        ...props
    }: Props) {

    const {
        ref,
        valueAsText,
        valueAsNumber,
        increment,
        decrement,
        onChange,
        onFocus,
        onBlur,
    } = useRootContext()


    const iconStyle = [style.icon, propIconStyle]
    const totalHeight = props.totalHeight ? props.totalHeight : (totalWidth * 0.4)
    const inputWidth = type === 'up-down' ? (totalWidth * 0.6) : (totalWidth * 0.4)
    const borderRadiusTotal = totalHeight * 0.18
    const fontSize = totalHeight * 0.38
    const maxReached = valueAsNumber === maxValue
    const minReached = valueAsNumber === minValue

    const inputStyle = type === 'up-down' ?
        [style.inputUpDown, {
            width: inputWidth,
            height: totalHeight,
            fontSize: fontSize,
            color: textColor,
            borderRightWidth: 2,
            borderRightColor: borderColor
        }, propInputStyle] :
        [style.inputPlusMinus, {
            width: inputWidth,
            height: totalHeight,
            fontSize: fontSize,
            color: textColor,
            borderRightWidth: separatorWidth,
            borderLeftWidth: separatorWidth,
            borderLeftColor: borderColor,
            borderRightColor: borderColor
        }, propInputStyle]

    const upDownStyle = [{
        alignItems: 'center',
        width: totalWidth - inputWidth,
        backgroundColor: upDownButtonsBackgroundColor,
        borderRightWidth: 1,
        borderRightColor: borderColor
    }, rounded ? {borderTopRightRadius: borderRadiusTotal, borderBottomRightRadius: borderRadiusTotal} : {}
    ] as ViewStyle[]

    const inputWraperStyle = {
        alignSelf: 'center',
        borderLeftColor: borderColor,
        borderLeftWidth: separatorWidth,
        borderRightWidth: separatorWidth,
        borderRightColor: borderColor
    } as ViewStyle


    if (type === 'up-down')
        return (
            <Fragment>
                <TextInput
                    {...extraTextInputProps}
                    editable={editable}
                    returnKeyType='done'
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType='numeric'
                    value={valueAsText}
                    onChangeText={onChange}
                    style={inputStyle} ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                <View style={upDownStyle}>
                    <DecrementAction
                        Icon={ChevronUp}
                        iconProps={{
                            size: fontSize,
                            style: [...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]
                        }}
                        viewProps={{
                            style: {flex: 1, width: '100%', alignItems: 'center'}
                        }}

                    />
                    <IncrementAction
                        Icon={ChevronDown}
                        iconProps={{
                            size: fontSize,
                            style: [...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]
                        }}
                        viewProps={{
                            style: {flex: 1, width: '100%', alignItems: 'center'}
                        }}
                    />
                </View>
            </Fragment>)
    else return (
        <Fragment>
            <View style={[inputWraperStyle]}>
                <TextInput
                    {...extraTextInputProps}
                    editable={editable}
                    returnKeyType='done'
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType='numeric'
                    value={valueAsText}
                    onChangeText={onChange}
                    style={inputStyle}
                    ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </View>
        </Fragment>
    )
}

type IRootContext = {
    ref: React.RefObject<TextInput | null>,
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
        <RootContext value={{ref, valueAsText, valueAsNumber, increment, decrement, onChange, onFocus, onBlur}}>
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

type AnyComponent = React.ComponentType<any>

type ComponentStatus = {
    isMaxReached: boolean,
    isMinReached: boolean,
}

type ActionProps<T extends AnyComponent> = ComponentPropsWithRef<typeof Pressable> & {
    Icon: T,
    iconProps: React.ComponentProps<T> | ((status: ComponentStatus) => React.ComponentProps<T>),
    viewProps: React.ComponentProps<typeof View>,
}

export function IncrementAction<T extends AnyComponent>({Icon, ...props}: ActionProps<T>) {
    const {increment} = useRootContext()

    const withIconProps = useMemo(() => {
        if (typeof props.iconProps === 'function') {
            return (props.iconProps as Function)({
                isMaxReached: false,
                isMinReached: false
            })
        }

        return props.iconProps
    }, [props.iconProps]);

    return (
        <Pressable onPress={increment} {...props}>
            <View {...props.viewProps}>
                <Icon {...withIconProps} />
            </View>
        </Pressable>
    )
}

export function DecrementAction<T extends AnyComponent>({Icon, ...props}: ActionProps<T>) {
    const {decrement} = useRootContext()

    const withIconProps = useMemo(() => {
        if (typeof props.iconProps === 'function') {
            return (props.iconProps as Function)({
                isMaxReached: false,
                isMinReached: false
            })
        }

        return props.iconProps
    }, [props.iconProps]);

    return (
        <Pressable onPress={decrement} {...props}>
            <View {...props.viewProps}>
                <Icon {...withIconProps} />
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