import React from "react";
import { Minus, Plus } from "lucide-react-native";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { useNumberInput, type UseNumberInputArgs } from "expo-number-input";

import { NumericInputProps } from "./Input";

export const NumericInputMoreLess = ({
  borderColor = "#d4d4d4",
  rightButtonBackgroundColor = "white",
  leftButtonBackgroundColor = "white",
  ...props
}: Partial<NumericInputProps & UseNumberInputArgs>) => {
  const inputContainerStyle = [
    {
      borderColor: borderColor,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
      width: "100%",
      borderWidth: 0.7,
    },
  ] satisfies StyleProp<ViewStyle>;

  const {
    ref,
    valueAsText,
    valueAsNumber,
    increment,
    decrement,
    onChange,
    onFocus,
    onBlur,
  } = useNumberInput({
    value: props.value || 0,
    step: props.step || 1,
    valueType: props.valueType || "integer",
    maxValue: props.maxValue || null,
    minValue: props.minValue || null,
    validateOnBlur: true,
  });

  return (
    <View style={inputContainerStyle}>
      <Pressable onPress={decrement}>
        <View
          style={[
            styles.Action,
            { backgroundColor: rightButtonBackgroundColor },
          ]}
        >
          <Minus style={styles.Icon} size={20} color="#434A5E" />
        </View>
      </Pressable>
      <TextInput
        ref={ref}
        style={{ flex: 1, width: "100%" }}
        returnKeyType="done"
        keyboardType="numeric"
        value={valueAsText}
        onChangeText={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <Pressable onPress={increment}>
        <View
          style={[
            styles.Action,
            { backgroundColor: leftButtonBackgroundColor },
          ]}
        >
          <Plus style={styles.Icon} size={20} color="#434A5E" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Icon: {
    fontWeight: "900",
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 15,
    color: "#434A5E",
  },
  Action: {
    height: "100%",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "#CCC",
    borderLeftWidth: 0.7,
  },
});
