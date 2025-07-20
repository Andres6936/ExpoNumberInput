# Expo Numeric Input

A customizable numeric input component for React Native and Expo applications.

## Features

- Fully customizable numeric input
- Increment and decrement buttons
- Min/max value constraints
- Custom styling support
- React Native Vector Icons integration
- TypeScript support

````typescript jsx
import {NumericInput} from 'expo-number-input';

// Basic usage 
<NumericInput
    value={0} onChange={(value) => console.log(value)}
/>

// With min/max constraints 
<NumericInput
    value={5} minValue={0} maxValue={10} onChange={(value) => console.log(value)}
/>

// Custom styling 
<NumericInput
    value={0} onChange={(value) => console.log(value)}
    containerStyle={{backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10}}
    inputStyle={{fontSize: 18, color: '#333'}} buttonStyle={{backgroundColor: '#007AFF'}}
/>

````


## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | Current value of the input |
| onChange | (value: number) => void | required | Callback function when value changes |
| minValue | number | undefined | Minimum allowed value |
| maxValue | number | undefined | Maximum allowed value |
| step | number | 1 | Step value for increment/decrement |
| containerStyle | ViewStyle | {} | Style for the container component |
| inputStyle | TextStyle | {} | Style for the input field |
| buttonStyle | ViewStyle | {} | Style for increment/decrement buttons |
| iconSize | number | 24 | Size of the increment/decrement icons |
| iconColor | string | '#000' | Color of the increment/decrement icons |
| disabled | boolean | false | Disables the input component |

## Requirements

- React Native or Expo project
- React Native Vector Icons (automatically installed with the package)
- React 17.0.0 or higher

## License

MIT