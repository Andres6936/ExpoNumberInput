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
                step={1}
                minValue={0}
                valueType="real"
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
                step={5}
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
                minValue={0}
            />
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
                minValue={0}
                maxValue={5}
                validateOnBlur
            />
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
            />
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
                rightButtonBackgroundColor='#0FFF95'
                leftButtonBackgroundColor='#06BA63'
            />
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
                rightButtonBackgroundColor='#EA3788'
                leftButtonBackgroundColor='#E56B70'
            />
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
