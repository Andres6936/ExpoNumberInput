import React from "react";
import {Minus, Plus} from "lucide-react-native";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import * as NumberInputPrimitive from "expo-number-input";

import {NumericInputProps} from "./Input";


export const NumericInputMoreLess = (
    {
        borderColor = '#d4d4d4',
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps & Partial<NumericInputProps>
) => {
    const inputContainerStyle = [{
        borderColor: borderColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: '100%',
        borderWidth: 0.7,
    }] satisfies StyleProp<ViewStyle>

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.DecrementAction
                Icon={Minus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [styles.Icon, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}] as StyleProp<ViewStyle>
                })}
                viewProps={{
                    style: [styles.Action, {backgroundColor: rightButtonBackgroundColor}],
                }}
            />
            <NumberInputPrimitive.Input style={{flex: 1, width: "100%"}}/>
            <NumberInputPrimitive.IncrementAction
                Icon={Plus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [styles.Icon, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}] as StyleProp<ViewStyle>
                })}
                viewProps={{
                    style: [styles.Action, {backgroundColor: leftButtonBackgroundColor}],
                }}
            />
        </NumberInputPrimitive.Root>
    )
}


const styles = StyleSheet.create({
    Icon: {
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 15,
        color: '#434A5E'
    },
    Action: {
        height: '100%',
        aspectRatio: "1/1",
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: "#CCC",
        borderLeftWidth: 0.7
    }
})