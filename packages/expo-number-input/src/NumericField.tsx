import React, {ComponentPropsWithRef, useEffect, useMemo} from "react";
import {Pressable, StyleProp, TextInput, TextStyle, View, ViewStyle} from "react-native";

import * as Slot from './Slot'
import {useNumericInput} from "./useNumericInput";
import {ComponentPropsWithAsChild} from "./types";


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

export type RootProps = ComponentPropsWithAsChild<typeof View> & {
    value: number
    step?: number
    minValue?: number | null
    maxValue?: number | null
    valueType?: 'integer' | 'real'
    validateOnBlur?: boolean
    onChange?: (value: number) => void
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
        ...props
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

    useEffect(() => {
        props.onChange?.(valueAsNumber)
    }, [valueAsNumber])

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
            <Component {...props} />
        </RootContext>
    )
}


export function Input(props: React.ComponentProps<typeof TextInput>) {
    const {
        ref,
        valueAsText,
        onChange,
        onFocus,
        onBlur,
    } = useRootContext()

    return (
        <TextInput
            {...props}
            ref={ref}
            returnKeyType='done'
            keyboardType='numeric'
            value={valueAsText}
            onChangeText={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
        />
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
    viewProps?: React.ComponentProps<typeof View>,
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
