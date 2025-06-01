import {useRef, useState} from "react";
import {TextInput} from "react-native";

type Args = {
    step: number,
    value: number,
    minValue: number | null,
    maxValue: number | null,
    valueType: 'integer' | 'real',
    validateOnBlur: boolean,

    onBlur?: () => void,
    onFocus?: () => void,
    onChange?: (value: number) => void
    onLimitReached?: (isMax: boolean, msg: string) => void
}

const isReal = (value: string): boolean => {
    if (!value) return false;
    const isReal = value.match(/-?\d+(\.(\d+)?)?/)!
    const isPart = value.match(/-?\d+(\.(\d+)?)?/)![0]
    const isExact = value.match(/-?\d+(\.(\d+)?)?/)!
    return isReal && isPart === isExact.input
}

const isInt = (value: string): boolean => {
    if (!value) return false;
    const isInt = value.match(/-?\d+/)!
    const isPart = value.match(/-?\d+/)![0]
    const isExact = value.match(/-?\d+/)!
    return isInt && isPart === isExact.input
}

export function useNumericInput(args: Args) {
    const ref = useRef<TextInput | null>(null);

    const [lastValid, setLastValid] = useState(args.value)
    const [valueAsText, setValueAsText] = useState(args.value.toString())
    const [valueAsNumber, setValueAsNumber] = useState(args.value)

    const increment = () => {
        let newValue = args.value && (typeof args.value === 'number') ? args.value : valueAsNumber
        if (args.maxValue === null || (newValue + args.step < args.maxValue)) {
            const numericAs = (newValue + args.step).toFixed(12)
            newValue = args.valueType === 'real' ? parseFloat(numericAs) : parseInt(numericAs)
            setValueAsNumber(newValue)
            setValueAsText(newValue.toString())
        } else if (args.maxValue !== null) {
            args.onLimitReached?.(true, 'Reached Maximum Value!')
            newValue = args.maxValue
            setValueAsNumber(newValue)
            setValueAsText(newValue.toString())
        }
        if (newValue !== args.value) {
            args.onChange?.(Number(newValue))
        }
    }

    const decrement = () => {
        let newValue = args.value && (typeof args.value === 'number') ? args.value : valueAsNumber
        if (args.minValue === null || (newValue - args.step > args.minValue)) {
            const numericAs = (newValue - args.step).toFixed(12)
            newValue = args.valueType === 'real' ? parseFloat(numericAs) : parseInt(numericAs)
        } else if (args.minValue !== null) {
            args.onLimitReached?.(false, 'Reached Minimum Value!')
            newValue = args.minValue
        }
        if (newValue !== args.value) {
            args.onChange?.(Number(newValue))
        }
        setValueAsNumber(newValue)
        setValueAsText(newValue.toString())
    }

    const onChange = (value: string) => {
        let currValue = value
        if ((value.length === 1 && value === '-') || (value.length === 2 && value === '0-')) {
            setValueAsText('-')
            return
        }
        if ((value.length === 1 && value === '.') || (value.length === 2 && value === '0.')) {
            setValueAsText('0.')
            return
        }
        if ((value.charAt(value.length - 1) === '.')) {
            setValueAsText(value)
            return
        }
        let isLegal = isLegalValue(value)
        if (isLegal) {
            setLastValid(+value)
        }
        if (!isLegal && !args.validateOnBlur) {
            if (ref.current) {
                ref.current.blur()
                setTimeout(() => {
                    ref.current?.clear()
                    setTimeout(() => {
                        args.onChange?.(+currValue - 1);
                        setValueAsNumber(+currValue - 1);
                        setTimeout(() => {
                            setValueAsNumber(+currValue);
                            args.onChange?.(+currValue);
                        }, 0);
                    }, 10)
                }, 15)
                setTimeout(() => ref.current?.focus(), 20)
            }

        } else if (!isLegal && args.validateOnBlur) {
            setValueAsText(value)
            let parsedValue = args.valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== args.value) {
                args.onChange?.(parsedValue)
            }
            setValueAsNumber(parsedValue)
            setValueAsText(parsedValue.toString())
        } else {
            setValueAsText(value)
            let parsedValue = args.valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== args.value) {
                args.onChange?.(parsedValue)
            }
            setValueAsNumber(parsedValue)
            setValueAsText(parsedValue.toString())

        }
    }

    const isLegalValue = (value: string) =>
        value === '' ||
        (args.valueType === 'real' && isReal(value) || args.valueType !== 'real' && isInt(value)) &&
        (args.maxValue === null || parseFloat(value) <= args.maxValue) &&
        (args.minValue === null || parseFloat(value) >= args.minValue)



    const onBlur = () => {

        let match = valueAsText.match(/-?[0-9]\d*(\.\d+)?/)
        let legal = match && match[0] === match.input && ((args.maxValue === null || (parseFloat(valueAsText) <= args.maxValue)) && (args.minValue === null || (parseFloat(valueAsText) >= args.minValue)))
        if (!legal) {
            if (args.minValue !== null && (parseFloat(valueAsText) <= args.minValue)) {
                args.onLimitReached?.(true, 'Reached Minimum Value!')
            }
            if (args.maxValue !== null && (parseFloat(valueAsText) >= args.maxValue)) {
                args.onLimitReached?.(false, 'Reached Maximum Value!')
            }
            if (ref.current) {
                ref.current.blur()
                setTimeout(() => {
                    ref.current?.clear()
                    setTimeout(() => {
                        args.onChange?.(lastValid);
                        setValueAsNumber(lastValid);
                        setTimeout(() => {
                            setValueAsNumber(lastValid)
                            setValueAsText(lastValid?.toString())
                            args.onChange?.(lastValid)
                        }, 0)
                    }, 10)
                }, 15)
                setTimeout(() => ref.current?.focus(), 50)
            }
        }
        args.onBlur?.()
    }

    const onFocus = () => {
        setLastValid(valueAsNumber)
        args.onFocus?.()
    }

    return {
        ref,
        valueAsText,
        valueAsNumber,
        increment,
        decrement,
        onChange,
        onFocus,
        onBlur,
    }
}