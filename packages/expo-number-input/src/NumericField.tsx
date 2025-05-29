import React, {useEffect, useRef, useState} from "react";
import {Pressable, StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {create, PREDEF_RES} from 'react-native-pixel-perfect'
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react-native";

let calcSize = create(PREDEF_RES.iphone7.px)

type Props = {
    value?: number | null
    minValue?: number | null
    maxValue?: number | null
    step?: number
    valueType?: 'integer' | 'real'
    initValue?: number | null
    iconSize?: number
    borderColor?: string
    iconStyle?: ViewStyle
    totalWidth?: number
    separatorWidth?: number
    type?: 'plus-minus' | 'up-down'
    rounded?: boolean
    textColor?: string
    containerStyle?: ViewStyle
    inputStyle?: ViewStyle
    upDownButtonsBackgroundColor?: string
    rightButtonBackgroundColor?: string
    leftButtonBackgroundColor?: string
    totalHeight?: number
    onChange: (value: number) => void
    onLimitReached?: (isMax: boolean, msg: string) => void
    editable?: boolean
    validateOnBlur?: boolean
    reachMaxIncIconStyle?: ViewStyle
    reachMaxDecIconStyle?: ViewStyle
    reachMinIncIconStyle?: ViewStyle
    reachMinDecIconStyle?: ViewStyle
    extraTextInputProps?: object,
    onBlur?: () => void,
    onFocus?: () => void,
}

export function NumericField(
    {
        initValue = null,
        value: propValue = null,
        iconSize = calcSize(30),
        borderColor = '#d4d4d4',
        iconStyle: propIconStyle = {},
        totalWidth = calcSize(220),
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
    const noInitSent = initValue !== 0 && !initValue;
    const [value, setValue] = useState(
        noInitSent ? (propValue ?? 0) : initValue
    );
    const [lastValid, setLastValid] = useState(
        noInitSent ? (propValue ?? 0) : initValue
    );
    const [stringValue, setStringValue] = useState(
        (noInitSent ? (propValue ?? 0) : initValue).toString()
    );
    const ref = useRef<TextInput | null>(null);

    // This replaces componentDidUpdate
    useEffect(() => {
        const initSent = !(initValue !== 0 && !initValue);

        if (initValue !== value && initSent) {
            setValue(initValue);
            setLastValid(initValue);
            setStringValue(initValue.toString());
        }
    }, [initValue, value]);

    const iconStyle = [style.icon, propIconStyle]
    const totalHeight = props.totalHeight ? props.totalHeight : (totalWidth * 0.4)
    const inputWidth = type === 'up-down' ? (totalWidth * 0.6) : (totalWidth * 0.4)
    const borderRadiusTotal = totalHeight * 0.18
    const fontSize = totalHeight * 0.38
    const maxReached = value === maxValue
    const minReached = value === minValue
    const inputContainerStyle = type === 'up-down' ?
        [style.inputContainerUpDown, {
            width: totalWidth,
            height: totalHeight,
            borderColor: borderColor
        }, rounded ? {borderRadius: borderRadiusTotal} : {}, containerStyle] :
        [style.inputContainerPlusMinus, {
            width: totalWidth,
            height: totalHeight,
            borderColor: borderColor
        }, rounded ? {borderRadius: borderRadiusTotal} : {}, containerStyle]

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

    const inc = () => {
        console.log("INC")
        let newValue = propValue && (typeof propValue === 'number') ? propValue : value
        if (maxValue === null || (newValue + step < maxValue)) {
            const numericAs = (newValue + step).toFixed(12)
            newValue = valueType === 'real' ? parseFloat(numericAs) : parseInt(numericAs)
            setValue(newValue)
            setStringValue(newValue.toString())
        } else if (maxValue !== null) {
            onLimitReached(true, 'Reached Maximum Value!')
            newValue = maxValue
            setValue(newValue)
            setStringValue(newValue.toString())
        }
        if (newValue !== propValue)
            props.onChange && props.onChange(Number(newValue))
    }

    const dec = () => {
        let newValue = propValue && (typeof propValue === 'number') ? propValue : value
        if (minValue === null || (newValue - step > minValue)) {
            const numericAs = (newValue - step).toFixed(12)
            newValue = valueType === 'real' ? parseFloat(numericAs) : parseInt(numericAs)
        } else if (minValue !== null) {
            onLimitReached(false, 'Reached Minimum Value!')
            newValue = minValue
        }
        if (newValue !== propValue)
            props.onChange && props.onChange(Number(newValue))
        setValue(newValue)
        setStringValue(newValue.toString())
    }

    const isLegalValue = (value: string, mReal: (value: string) => boolean, mInt: (value: string) => boolean) => value === '' || (((valueType === 'real' && mReal(value)) || (valueType !== 'real' && mInt(value))) && (maxValue === null || (parseFloat(value) <= maxValue)) && (minValue === null || (parseFloat(value) >= minValue)))

    const realMatch = (value: string): boolean => value && value.match(/-?\d+(\.(\d+)?)?/) && value.match(/-?\d+(\.(\d+)?)?/)[0] === value.match(/-?\d+(\.(\d+)?)?/).input

    const intMatch = (value: string): boolean => value && value.match(/-?\d+/) && value.match(/-?\d+/)[0] === value.match(/-?\d+/).input

    const onChange = (value: string) => {
        let currValue = typeof propValue === 'number' ? propValue : value
        if ((value.length === 1 && value === '-') || (value.length === 2 && value === '0-')) {
            setStringValue('-')
            return
        }
        if ((value.length === 1 && value === '.') || (value.length === 2 && value === '0.')) {
            setStringValue('0.')
            return
        }
        if ((value.charAt(value.length - 1) === '.')) {
            setStringValue(value)
            return
        }
        let legal = isLegalValue(value, realMatch, intMatch)
        if (legal) {
            setLastValid(value)
        }
        if (!legal && !validateOnBlur) {
            if (ref.current) {
                ref.current.blur()
                setTimeout(() => {
                    ref.current.clear()
                    setTimeout(() => {
                        props.onChange?.(currValue - 1);
                        setValue(currValue - 1);
                        setTimeout(() => {
                            setValue(currValue);
                            props.onChange?.(currValue);
                        }, 0);
                    }, 10)
                }, 15)
                setTimeout(() => ref.current.focus(), 20)
            }

        } else if (!legal && validateOnBlur) {
            setStringValue(value)
            let parsedValue = valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== propValue)
                props.onChange && props.onChange(parsedValue)
            setValue(parsedValue)
            setStringValue(parsedValue.toString())
        } else {
            setStringValue(value)
            let parsedValue = valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== propValue)
                props.onChange && props.onChange(parsedValue)
            setValue(parsedValue)
            setStringValue(parsedValue.toString())

        }
    }

    const onBlur = () => {

        let match = stringValue.match(/-?[0-9]\d*(\.\d+)?/)
        let legal = match && match[0] === match.input && ((maxValue === null || (parseFloat(stringValue) <= maxValue)) && (minValue === null || (parseFloat(stringValue) >= minValue)))
        if (!legal) {
            if (minValue !== null && (parseFloat(stringValue) <= minValue)) {
                onLimitReached(true, 'Reached Minimum Value!')
            }
            if (maxValue !== null && (parseFloat(stringValue) >= maxValue)) {
                onLimitReached(false, 'Reached Maximum Value!')
            }
            if (ref.current) {
                ref.current.blur()
                setTimeout(() => {
                    ref.current.clear()
                    setTimeout(() => {
                        props.onChange?.(lastValid);
                        setValue(lastValid);
                        setTimeout(() => {
                            setValue(lastValid)
                            setStringValue(lastValid?.toString())
                            props.onChange?.(lastValid)
                        }, 0)
                    }, 10)
                }, 15)
                setTimeout(() => ref.current.focus(), 50)
            }
        }
        props.onBlur && props.onBlur()
    }

    const onFocus = () => {
        setLastValid(value)
        props.onFocus && props.onFocus()
    }

    if (type === 'up-down')
        return (
            <View style={inputContainerStyle}>
                <TextInput
                    {...extraTextInputProps}
                    editable={editable}
                    returnKeyType='done'
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType='numeric'
                    value={stringValue}
                    onChangeText={onChange}
                    style={inputStyle} ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                <View style={upDownStyle}>
                    <Pressable
                        onPress={inc}
                        style={{flex: 1, width: '100%', alignItems: 'center'}}
                    >
                        <ChevronUp
                            size={fontSize}
                            style={[...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]}
                        />
                    </Pressable>
                    <Pressable onPress={dec} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <ChevronDown
                            size={fontSize}
                            style={[...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]}
                        />
                    </Pressable>
                </View>
            </View>)
    else return (
        <View style={inputContainerStyle}>
            <Pressable
                onPress={dec}
                style={leftButtonStyle}
            >
                <Minus
                    size={fontSize}
                    style={[...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]}
                />
            </Pressable>
            <View style={[inputWraperStyle]}>
                <TextInput
                    {...extraTextInputProps}
                    editable={editable}
                    returnKeyType='done'
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType='numeric'
                    value={stringValue}
                    onChangeText={onChange}
                    style={inputStyle}
                    ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </View>
            <Pressable
                onPress={inc}
                style={rightButtonStyle}
            >
                <Plus
                    size={fontSize}
                    style={[...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]}
                />
            </Pressable>
        </View>
    )
}


const style = StyleSheet.create({
    seprator: {
        backgroundColor: 'grey',
        height: calcSize(80),
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
        paddingRight: calcSize(15)
    }
})