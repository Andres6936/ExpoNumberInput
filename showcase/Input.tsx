import * as NumericInput from 'expo-number-input'

export const NumericInputMoreLess = (props: NumericInput.Props) => {
    return (
        <NumericInput.Root>
            <NumericInput.NumericField {...props}/>
        </NumericInput.Root>
    )
}

export const NumericInputUpDown = () => {

}