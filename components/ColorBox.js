/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = (props) => {
    const boxColor = {
        backgroundColor: props.hexCode,
    };
    const textStyle = {
        color:
            parseInt(props.hexCode.replace('#', ''), 16) > 0xffffff / 1.1
                ? 'black'
                : 'white',
    };

    return (
        <>
            <View style={[styles.box, boxColor]}>
                <Text style={styles.text}>
                    <Text style={[styles.text, textStyle]}>
                        {props.colorName} {props.hexCode}
                    </Text>
                </Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

    box: {
        padding: 10,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    // cyan: {
    //     backgroundColor: '#2aa198',
    // },
    boxText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default ColorBox;