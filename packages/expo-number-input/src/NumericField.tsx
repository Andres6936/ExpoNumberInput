import {useEffect, useRef, useState} from "react";
import {ViewStyle} from "react-native";
import {Color} from "csstype";

type Props = {
    value?: number
    minValue?: number
    maxValue?: number
    step?: number
    valueType?: 'integer' | 'real'
    initValue?: number
    iconSize?: number
    borderColor?: Color
    iconStyle?: ViewStyle
    totalWidth?: number
    separatorWidth?: number
    type?: 'plus-minus' | 'up-down'
    rounded?: boolean
    textColor?: Color
    containerStyle?: ViewStyle
    inputStyle?: ViewStyle
    upDownButtonsBackgroundColor?: Color
    rightButtonBackgroundColor?: Color
    leftButtonBackgroundColor?: Color
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

export function NumericField({ initValue, value: propValue ,...props}: Props) {
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


}