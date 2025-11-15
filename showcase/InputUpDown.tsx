import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
  View,
  Pressable,
} from "react-native";
import { useNumberInput, type UseNumberInputArgs } from "expo-number-input";

import { NumericInputProps } from "./Input";

export const NumericInputUpDown = ({
  borderColor = "#d4d4d4",
  rightButtonBackgroundColor = "white",
  leftButtonBackgroundColor = "white",
  ...props
}: Partial<NumericInputProps & UseNumberInputArgs>) => {
  const inputContainerStyle = [
    {
      flexDirection: "row",
      alignItems: "center",
      borderColor: borderColor,
      flex: 1,
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
      <TextInput
        ref={ref}
        style={{ flex: 1 }}
        returnKeyType="done"
        keyboardType="numeric"
        value={valueAsText}
        onChangeText={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      <View style={styles.Container}>
        <Pressable onPress={increment}>
          <View>
            <ChevronUp style={styles.Icon} size={20} color="#434A5E" />
          </View>
        </Pressable>
        <Pressable onPress={decrement}>
          <View>
            <ChevronDown style={styles.Icon} size={20} color="#434A5E" />
          </View>
        </Pressable>
      </View>
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
  Container: {
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderLeftColor: "#CCC",
    borderLeftWidth: 0.7,
    flexDirection: "column",
    height: "100%",
  },
});
