import React from "react";
import {ChevronDown, ChevronUp} from "lucide-react-native";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import * as NumberInputPrimitive from "expo-number-input";

import {NumericInputProps} from "./Input";

export const NumericInputUpDown = (
    {
        borderColor = '#d4d4d4',
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps & Partial<NumericInputProps>
) => {
    const inputContainerStyle = [{
        flexDirection: 'row',
        alignItems: "center",
        borderColor: borderColor,
        flex: 1,
        borderWidth: 0.7,
    }] satisfies StyleProp<ViewStyle>

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.Input style={{flex: 1}}/>
            <NumberInputPrimitive.Container style={styles.Container}>
                <NumberInputPrimitive.IncrementAction
                    Icon={ChevronUp}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [styles.Icon, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}] as StyleProp<ViewStyle>
                    })}
                />
                <NumberInputPrimitive.DecrementAction
                    Icon={ChevronDown}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [styles.Icon, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}] as StyleProp<ViewStyle>
                    })}
                />
            </NumberInputPrimitive.Container>
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
    Container: {
        aspectRatio: "1/1",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderLeftColor: "#CCC",
        borderLeftWidth: 0.7,
        flexDirection: "column",
        height: "100%"
    }
})