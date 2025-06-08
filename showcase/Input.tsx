import React from "react";
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react-native";
import * as NumericInput from 'expo-number-input'
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

export const NumericInputMoreLess = (
    {
        borderColor = '#d4d4d4',
        rounded = false,
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumericInput.Props
) => {
    const inputContainerStyle = [style.inputContainerPlusMinus, {
        borderColor: borderColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    }, props.containerStyle] satisfies StyleProp<ViewStyle>

    const iconStyle = [style.icon, props.iconStyle]

    return (
        <NumericInput.Root {...props} style={inputContainerStyle}>
            <NumericInput.DecrementAction
                Icon={Minus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}]
                })}
                viewProps={{
                    style: {backgroundColor: rightButtonBackgroundColor},
                }}
            />
            <NumericInput.NumericField {...props}/>
            <NumericInput.IncrementAction
                Icon={Plus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}]
                })}
                viewProps={{
                    style: {backgroundColor: leftButtonBackgroundColor},
                }}
            />
        </NumericInput.Root>
    )
}

export const NumericInputUpDown = (
    {
        borderColor = '#d4d4d4',
        rounded = false,
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumericInput.Props
) => {
    const inputContainerStyle = [style.inputContainerUpDown, {
        borderColor: borderColor
    }, props.containerStyle]

    const iconStyle = [style.icon, props.iconStyle]

    return (
        <NumericInput.Root {...props} style={inputContainerStyle}>
            <NumericInput.NumericField {...props}/>
            <NumericInput.Container style={{justifyContent: "space-between", flexDirection: "column"}}>
                <NumericInput.IncrementAction
                    Icon={ChevronUp}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}]
                    })}
                    viewProps={{
                        style: {flex: 1, width: '100%', alignItems: 'center'}
                    }}
                />
                <NumericInput.DecrementAction
                    Icon={ChevronDown}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}]
                    })}
                    viewProps={{
                        style: {flex: 1, width: '100%', alignItems: 'center'}
                    }}

                />
            </NumericInput.Container>
        </NumericInput.Root>
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