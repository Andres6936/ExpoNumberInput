import * as NumericInput from 'expo-number-input'
import {StyleSheet} from "react-native";

export const NumericInputMoreLess = (
    {
        totalWidth = 220,
        borderColor = '#d4d4d4',
        rounded = false,
        ...props
    }: NumericInput.Props
) => {
    const totalHeight = props.totalHeight ? props.totalHeight : (totalWidth * 0.4)
    const borderRadiusTotal = totalHeight * 0.18

    const inputContainerStyle =  [style.inputContainerPlusMinus, {
        width: totalWidth,
        height: totalHeight,
        borderColor: borderColor
    }, rounded ? {borderRadius: borderRadiusTotal} : {}, props.containerStyle]


    return (
        <NumericInput.Root style={inputContainerStyle}>
            <NumericInput.NumericField {...props}/>
        </NumericInput.Root>
    )
}

export const NumericInputUpDown = (
    {
        totalWidth = 220,
        borderColor = '#d4d4d4',
        rounded = false,
        ...props
    }: NumericInput.Props
) => {
    const totalHeight = props.totalHeight ? props.totalHeight : (totalWidth * 0.4)
    const borderRadiusTotal = totalHeight * 0.18

    const inputContainerStyle = [style.inputContainerUpDown, {
        width: totalWidth,
        height: totalHeight,
        borderColor: borderColor
    }, rounded ? {borderRadius: borderRadiusTotal} : {}, props.containerStyle]

    return (
        <NumericInput.Root style={inputContainerStyle}>
            <NumericInput.NumericField {...props}/>
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