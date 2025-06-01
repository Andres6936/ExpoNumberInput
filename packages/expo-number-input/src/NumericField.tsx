import React, {ComponentPropsWithRef, Fragment} from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    TextInput, TextProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";
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
    } = useNumericInput({
        step,
        value: propValue,
        minValue,
        maxValue,
        valueType,
        validateOnBlur,
    })


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

    const rightButtonStyle = [
        {
            position: 'absolute',
            zIndex: -1,
            right: 0,
            height: totalHeight - 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            backgroundColor: rightButtonBackgroundColor,
            width: (totalWidth - inputWidth) / 2
        },
        rounded ?
            {
                borderTopRightRadius: borderRadiusTotal,
                borderBottomRightRadius: borderRadiusTotal
            }
            : {}
    ] as ViewStyle[]

    const leftButtonStyle = [
        {
            position: 'absolute',
            zIndex: -1,
            left: 0,
            height: totalHeight - 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: leftButtonBackgroundColor,
            width: (totalWidth - inputWidth) / 2,
            borderWidth: 0
        },

        rounded ?
            {borderTopLeftRadius: borderRadiusTotal, borderBottomLeftRadius: borderRadiusTotal}
            : {}
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
                    <Pressable
                        onPress={increment}
                        style={{flex: 1, width: '100%', alignItems: 'center'}}
                    >
                        <ChevronUp
                            size={fontSize}
                            style={[...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]}
                        />
                    </Pressable>
                    <Pressable onPress={decrement} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <ChevronDown
                            size={fontSize}
                            style={[...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]}
                        />
                    </Pressable>
                </View>
            </Fragment>)
    else return (
        <Fragment>
            <MinusAction
                Icon={Minus}
                iconProps={{
                    size: fontSize,
                    style: [...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]
                }}
                onPress={() => {
                    decrement()
                    console.log("DECREMENT")
                }}
                rootStyle={[{
                    backgroundColor: rightButtonBackgroundColor,
                }, rounded ?
                    {
                        borderTopRightRadius: borderRadiusTotal,
                        borderBottomRightRadius: borderRadiusTotal
                    }
                    : {}]}
            />
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
            <PlusAction
                Icon={Plus}
                iconProps={{
                    size: fontSize,
                    style: [...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]
                }}
                onPress={() => {
                    increment()
                    console.log("INCREMENT")
                }}
                 rootStyle={[{
                    backgroundColor: leftButtonBackgroundColor,
                }, rounded ?
                    {
                        borderTopLeftRadius: borderRadiusTotal,
                        borderBottomLeftRadius: borderRadiusTotal
                    }
                    : {}]}
            />
        </Fragment>
    )
}

export function Root({asChild, ref, ...viewProps}: ComponentPropsWithAsChild<typeof View>) {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} {...viewProps} />
}

export function Container() {
    return (null)
}

export function Input() {
    return (null)
}

type AnyComponent = React.ComponentType<any>

type ActionProps<T extends AnyComponent> = ComponentPropsWithRef<typeof Pressable> & {
    Icon: T,
    iconProps: React.ComponentProps<T>,
    rootStyle: StyleProp<ViewStyle>,
}

export function UpAction<T extends AnyComponent>({ref, ...props}: ActionProps<T>) {
    return (
        <Pressable ref={ref} {...props}/>
    )
}

export function DownAction<T extends AnyComponent>({ref, ...props}: ActionProps<T>) {
    return (
        <Pressable ref={ref} {...props}/>
    )
}

export function PlusAction<T extends AnyComponent>({Icon, iconProps, ...props}: ActionProps<T>) {
    return (
        <Pressable {...props}>
            <View style={props.rootStyle} >
                <Icon {...iconProps} />
            </View>
        </Pressable>
    )
}

export function MinusAction<T extends AnyComponent>({Icon, iconProps, ...props}: ActionProps<T>) {
    return (
        <Pressable {...props}>
            <View style={props.rootStyle} >
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