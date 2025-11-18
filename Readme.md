# Expo Number Input

A customizable React hook for building numeric input components in React Native and Expo applications.

## Features

- 🎯 **Hook-based API** - Build your own numeric input UI with full control
- ⬆️⬇️ Increment and decrement functionality
- 🔒 Min/max value constraints with limit detection
- 🔢 Support for integers and real numbers
- ✅ Input validation (on blur or on change)
- 📱 Full React Native and Expo support
- 🎨 Complete styling freedom
- 💪 TypeScript support

## Installation

```bash
bun add expo-number-input
```

## Basic Usage

The package exports a `useNumberInput` hook that handles all the numeric input logic. You can use it to create your own
custom components:

### Simple Input Component

```typescript jsx
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNumberInput } from 'expo-number-input';

function NumberInput({value, onChange, minValue = null, maxValue = null}) {
    const {ref, valueAsText, onChange: handleChange, onBlur, onFocus} = useNumberInput({
        step: 1,
        value,
        minValue,
        maxValue,
        valueType: 'integer',
        validateOnBlur: true,
        onChange,
    });
    return (
        <TextInput
            ref={ref}
            value={valueAsText}
            onChangeText={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
}
```

```typescript jsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useNumberInput } from 'expo-number-input';

function DecimalInput({value, onChange}) {
    const {ref, valueAsText, increment, decrement, onChange: handleChange, onBlur, onFocus} = useNumberInput({
        step: 0.1,
        value,
        minValue: -10,
        maxValue: 10,
        valueType: 'real',
        validateOnBlur: true,
        onChange,
        onLimitReached: (isMax, message) => {
            Alert.alert('Limit Reached', message);
        },
    });
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity
                onPress={decrement}
                style={{
                    backgroundColor: '#007AFF',
                    padding: 12,
                    borderRadius: 8
                }}>
                <Text style={{color: 'white', fontSize: 20}}>−</Text>
            </TouchableOpacity>
            <TextInput
                ref={ref}
                style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 8,
                    padding: 12,
                    minWidth: 100,
                    textAlign: 'center',
                    fontSize: 18,
                }}
                value={valueAsText}
                onChangeText={handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
                keyboardType="decimal-pad"
            />
            <TouchableOpacity
                onPress={increment}
                style={{
                    backgroundColor: '#007AFF',
                    padding: 12,
                    borderRadius: 8
                }}
            >
                <Text style={{color: 'white', fontSize: 20}}>+</Text>
            </TouchableOpacity>
        </View>
    )
};

```

## API Reference

### `useNumberInput(args: UseNumberInputArgs)`

#### Arguments

| Property         | Type                                    | Default      | Description                                                                        |
|------------------|-----------------------------------------|--------------|------------------------------------------------------------------------------------|
| `value`          | `number`                                | **required** | Current value (controlled)                                                         |
| `step`           | `number`                                | **required** | Increment/decrement step                                                           |
| `minValue`       | `number \| null`                        | **required** | Minimum allowed value (null for no limit)                                          |
| `maxValue`       | `number \| null`                        | **required** | Maximum allowed value (null for no limit)                                          |
| `valueType`      | `'integer' \| 'real'`                   | **required** | Type of number to handle                                                           |
| `validateOnBlur` | `boolean`                               | **required** | When `true`, validates input only on blur; when `false`, validates on every change |
| `onChange`       | `(value: number) => void`               | optional     | Callback when value changes                                                        |
| `onBlur`         | `() => void`                            | optional     | Callback when input loses focus                                                    |
| `onFocus`        | `() => void`                            | optional     | Callback when input gains focus                                                    |
| `onLimitReached` | `(isMax: boolean, msg: string) => void` | optional     | Callback when min/max limit is reached                                             |

#### Returns

| Property        | Type                     | Description                          |
|-----------------|--------------------------|--------------------------------------|
| `ref`           | `RefObject<TextInput>`   | Ref to attach to the TextInput       |
| `valueAsText`   | `string`                 | Current value as text for display    |
| `valueAsNumber` | `number`                 | Current value as number              |
| `increment`     | `() => void`             | Function to increment the value      |
| `decrement`     | `() => void`             | Function to decrement the value      |
| `onChange`      | `(text: string) => void` | Handler for TextInput's onChangeText |
| `onBlur`        | `() => void`             | Handler for TextInput's onBlur       |
| `onFocus`       | `() => void`             | Handler for TextInput's onFocus      |

## Tips

- Always pass `ref` to your `TextInput` for proper validation behavior
- Use `valueAsText` (not `valueAsNumber`) as the TextInput's `value` prop
- Connect `onChange`, `onBlur`, and `onFocus` from the hook to your TextInput
- Set `validateOnBlur: true` for better UX when typing negative numbers or decimals
- Use `valueType: 'real'` with `keyboardType="decimal-pad"` for decimal inputs
- Use `valueType: 'integer'` with `keyboardType="numeric"` for integer inputs

## Requirements

- React Native or Expo project
- React Native Vector Icons (automatically installed with the package)
- React 19.0.0 or higher

## License

MIT