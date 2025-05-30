import {useState} from "react";

type Args = {
    value: number
}

export function useNumericInput(args: Args) {
    const [lastValid, setLastValid] = useState(args.value)
    const [valueAsText, setValueAsText] = useState(args.value.toString())
    const [valueAsNumber, setValueAsNumber] = useState(args.value)
}