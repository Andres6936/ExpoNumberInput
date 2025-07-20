import {type StyleProp, type ViewStyle} from "react-native";

export type NumericInputProps = {
    borderColor : string,
    rightButtonBackgroundColor : string,
    leftButtonBackgroundColor : string,
    reachMaxIncIconStyle : StyleProp<ViewStyle>,
    reachMinIncIconStyle : StyleProp<ViewStyle>,
    reachMaxDecIconStyle : StyleProp<ViewStyle>,
    reachMinDecIconStyle : StyleProp<ViewStyle>,
}
