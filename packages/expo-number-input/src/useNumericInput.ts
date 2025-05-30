import {useState} from "react";

type Args = {
    value: number
}

export function useNumericInput(args: Args) {
    const [valueAsNumber, setValueAsNumber] = useState(args.value)
    const [lastValid, setLastValid] = useState(args.value)
    const [valueAsText, setValueAsText] = useState(args.value.toString())
}