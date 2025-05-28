import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, TextInput, View, ViewStyle} from "react-native";
import Button from "./Button";
import Icon from 'react-native-vector-icons/Ionicons'
import {create, PREDEF_RES} from 'react-native-pixel-perfect'

let calcSize = create(PREDEF_RES.iphone7.px)

type Props = {
    value?: number
    minValue?: number
    maxValue?: number
    step?: number
    valueType?: 'integer' | 'real'
    initValue?: number
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
    extraTextInputProps?: object
}

export function NumericField(
    {
        initValue = null,
        value: propValue = null,
        iconSize = calcSize(30),
        borderColor = '#d4d4d4',
        iconStyle: propIconStyle = {},
        totalWidth = calcSize(220),
        sepratorWidth = 1,
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
        onLimitReached = (isMax, msg) => { },
        extraTextInputProps = {},
        ...props,
    }: Props)
{
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
    const ref = useRef(null);

    // This replaces componentDidUpdate
    useEffect(() => {
        const initSent = !(initValue !== 0 && !initValue);

        if (initValue !== value && initSent) {
            setValue(initValue);
            setLastValid(initValue);
            setStringValue(initValue.toString());
        }
    }, [initValue, value]);

    const sepratorWidth = (typeof props.separatorWidth === 'undefined') ? sepratorWidth : props.separatorWidth;//supporting old property name sepratorWidth
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
            borderRightWidth: sepratorWidth,
            borderLeftWidth: sepratorWidth,
            borderLeftColor: borderColor,
            borderRightColor: borderColor
        }, propInputStyle]

    const upDownStyle = [{
        alignItems: 'center',
        width: totalWidth - inputWidth,
        backgroundColor: upDownButtonsBackgroundColor,
        borderRightWidth: 1,
        borderRightColor: borderColor
    }, rounded ? {borderTopRightRadius: borderRadiusTotal, borderBottomRightRadius: borderRadiusTotal} : {}]
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
            : {}]
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
            : {}]

    const inputWraperStyle = {
        alignSelf: 'center',
        borderLeftColor: borderColor,
        borderLeftWidth: sepratorWidth,
        borderRightWidth: sepratorWidth,
        borderRightColor: borderColor
    }

    const inc = () => {
        let value = propValue && (typeof propValue === 'number') ? propValue : this.state.value
        if (maxValue === null || (value + step < maxValue)) {
            value = (value + step).toFixed(12)
            value = valueType === 'real' ? parseFloat(value) : parseInt(value)
            setValue(value)
            setStringValue(value.toString())
        } else if (maxValue !== null) {
            props.onLimitReached(true, 'Reached Maximum Value!')
            value = maxValue
            setValue(value)
            setStringValue(value.toString())
        }
        if (value !== propValue)
            props.onChange && props.onChange(Number(value))
    }

    const dec = () => {
        let value = propValue && (typeof propValue === 'number') ? propValue : this.state.value
        if (minValue === null || (value - step > minValue)) {
            value = (value - step).toFixed(12)
            value = valueType === 'real' ? parseFloat(value) : parseInt(value)
        } else if (minValue !== null) {
            props.onLimitReached(false, 'Reached Minimum Value!')
            value = minValue
        }
        if (value !== propValue)
            props.onChange && props.onChange(Number(value))
        setValue(value)
        setStringValue(value.toString())
    }

    const isLegalValue = (value, mReal, mInt) => value === '' || (((valueType === 'real' && mReal(value)) || (valueType !== 'real' && mInt(value))) && (maxValue === null || (parseFloat(value) <= maxValue)) && (minValue === null || (parseFloat(value) >= minValue)))

    const realMatch = (value) => value && value.match(/-?\d+(\.(\d+)?)?/) && value.match(/-?\d+(\.(\d+)?)?/)[0] === value.match(/-?\d+(\.(\d+)?)?/).input

    const intMatch = (value) => value && value.match(/-?\d+/) && value.match(/-?\d+/)[0] === value.match(/-?\d+/).input

    const onChange = (value) => {
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
                        props.onChange && props.onChange(currValue - 1)
                        this.setState({value: currValue - 1}, () => {
                            this.setState({value: currValue, legal})
                            props.onChange && props.onChange(currValue)
                        })
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
            this.setState({legal})
            setValue(parsedValue)
            setStringValue(parsedValue.toString())
        } else {
            setStringValue(value)
            let parsedValue = valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== propValue)
                props.onChange && props.onChange(parsedValue)
            this.setState({legal})
            setValue(parsedValue)
            setStringValue(parsedValue.toString())

        }
    }

    const onBlur = () => {

        let match = stringValue.match(/-?[0-9]\d*(\.\d+)?/)
        let legal = match && match[0] === match.input && ((maxValue === null || (parseFloat(stringValue) <= maxValue)) && (minValue === null || (parseFloat(stringValue) >= minValue)))
        if (!legal) {
            if (minValue !== null && (parseFloat(stringValue) <= minValue)) {
                props.onLimitReached(true, 'Reached Minimum Value!')
            }
            if (maxValue !== null && (parseFloat(stringValue) >= maxValue)) {
                props.onLimitReached(false, 'Reached Maximum Value!')
            }
            if (ref.current) {
                ref.current.blur()
                setTimeout(() => {
                    ref.current.clear()
                    setTimeout(() => {
                        props.onChange && props.onChange(lastValid)
                        this.setState({value: lastValid}, () => {
                            this.setState({value: lastValid, stringValue: lastValid.toString()})
                            props.onChange && props.onChange(lastValid)
                        })
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
                <TextInput {...extraTextInputProps} editable={editable} returnKeyType='done'
                           underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={stringValue}
                           onChangeText={onChange} style={inputStyle} ref={ref}
                           onBlur={onBlur} onFocus={onFocus}/>
                <View style={upDownStyle}>
                    <Button onPress={inc} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <Icon name='ios-arrow-up' size={fontSize}
                              style={[...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]}/>
                    </Button>
                    <Button onPress={dec} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <Icon name='ios-arrow-down' size={fontSize}
                              style={[...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]}/>
                    </Button>
                </View>
            </View>)
    else return (
        <View style={inputContainerStyle}>
            <Button onPress={dec} style={leftButtonStyle}>
                <Icon name='md-remove' size={fontSize}
                      style={[...iconStyle, maxReached ? reachMaxDecIconStyle : {}, minReached ? reachMinDecIconStyle : {}]}/>
            </Button>
            <View style={[inputWraperStyle]}>
                <TextInput {...extraTextInputProps} editable={editable} returnKeyType='done'
                           underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={stringValue}
                           onChangeText={onChange} style={inputStyle} ref={ref}
                           onBlur={onBlur} onFocus={onFocus}/>
            </View>
            <Button onPress={inc} style={rightButtonStyle}>
                <Icon name='md-add' size={fontSize}
                      style={[...iconStyle, maxReached ? reachMaxIncIconStyle : {}, minReached ? reachMinIncIconStyle : {}]}/>
            </Button>
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