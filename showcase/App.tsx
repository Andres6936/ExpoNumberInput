import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NumericInputMoreLess, NumericInputUpDown} from "./Input";


function NumericInputExample() {
    const [value1, setValue1] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    return (
        <View style={{flex: 1, flexDirection: "column", gap: 8, marginBottom: 20}}>
            <Text style={styles.welcome}>
                Numeric Input Examples
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={value1 => {
                    setValue1(value1);
                }}
                onLimitReached={(isMin, msg) => console.log(isMin, msg)}
                iconSize={10}
                step={1}
                minValue={0}
                valueType="real"
                rounded editable={false}
                textColor="#B0228C"
                rightButtonBackgroundColor="#18c2ef"
                leftButtonBackgroundColor="#ff8080"
            />
            <NumericInputMoreLess
                value={value2}
                onChange={(v1) => {
                    setValue2(v1);
                }}
                minValue={0}
                maxValue={9999}
                onLimitReached={(isMAx, msg) => console.log(msg)}
                step={5}
                inputStyle={{fontSize: 18, color: '#434A5E'}}
                valueType='real'
                borderColor='#C7CBD6'
                rightButtonBackgroundColor='#C7CBD6'
                leftButtonBackgroundColor='#C7CBD6'
            />
        </View>
    )
}

function NumericInputBasic() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Basic Numeric Input - no limits
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={(v2) => setValue1(v2)}/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputRounded() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input - with minValue of 0
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={(v3) => setValue1(v3)}
                rounded
                minValue={0}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputReal() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Basic Numeric Input - with step of 0.5 and valueType real
            </Text>

            <NumericInputUpDown
                value={value1}
                onChange={(v4) => setValue1(v4)}
                type='up-down'
                valueType='real'
                step={0.5}/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputMax() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input - with minValue of 0 and maxValue of 5
            </Text>

            <NumericInputUpDown
                value={value1}
                onChange={value => setValue1(value)}
                rounded type='up-down'
                minValue={0}
                validateOnBlur
                maxValue={5}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputBasicStyle() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input - with styling and initial value of 6
            </Text>

            <NumericInputUpDown
                value={value1}
                onChange={(v5) => setValue1(v5)}
                rounded
                type='up-down'
                textColor='#26547C'
                upDownButtonsBackgroundColor='#06D6A0'/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputRoundedStyle() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input with styling
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={(v6) => setValue1(v6)}
                rounded
                textColor='#59656F'
                rightButtonBackgroundColor='#AC9FBB'
                leftButtonBackgroundColor='#DDBDD5'/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputCustom() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input with custom width
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={(v7) => setValue1(v7)}
                totalWidth={200}
                rounded
                textColor='#103900'
                rightButtonBackgroundColor='#0FFF95'
                leftButtonBackgroundColor='#06BA63'/>
            <View style={styles.seprator}/>
        </Fragment>
    )
}

function NumericInputCustomStyle() {
    const [value1, setValue1] = React.useState(0);

    return (
        <Fragment>
            <Text style={styles.instructions}>
                Rounded Numeric Input with custom width and height
            </Text>

            <NumericInputMoreLess
                value={value1}
                onChange={(v8) => setValue1(v8)}
                textColor='#B0228C'
                rightButtonBackgroundColor='#EA3788'
                leftButtonBackgroundColor='#E56B70'/>
        </Fragment>
    )
}

export default function App() {
    return (
        <View style={{paddingHorizontal: 20}}>
            <ScrollView style={{paddingBottom: 200}} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <NumericInputExample/>
                <NumericInputBasic/>
                <NumericInputRounded/>
                <NumericInputReal/>
                <NumericInputMax/>
                <NumericInputBasicStyle/>
                <NumericInputRoundedStyle/>
                <NumericInputCustom/>
                <NumericInputCustomStyle/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: null,
        width: null,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 60,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 5,
    },
    seprator: {
        height: 10,
        width: 200,
        margin: 10,
    }
});
