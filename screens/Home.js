/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Component, useState, useCallback, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import PalettePreview from '../components/PalettePreview';
// const SOLARIZED = [
//     { colorName: 'Base03', hexCode: '#002b36' },
//     { colorName: 'Base02', hexCode: '#073642' },
//     { colorName: 'Base01', hexCode: '#586e75' },
//     { colorName: 'Base00', hexCode: '#657b83' },
//     { colorName: 'Base0', hexCode: '#839496' },
//     { colorName: 'Base1', hexCode: '#93a1a1' },
//     { colorName: 'Base2', hexCode: '#eee8d5' },
//     { colorName: 'Base3', hexCode: '#fdf6e3' },
//     { colorName: 'Yellow', hexCode: '#b58900' },
//     { colorName: 'Orange', hexCode: '#cb4b16' },
//     { colorName: 'Red', hexCode: '#dc322f' },
//     { colorName: 'Magenta', hexCode: '#d33682' },
//     { colorName: 'Violet', hexCode: '#6c71c4' },
//     { colorName: 'Blue', hexCode: '#268bd2' },
//     { colorName: 'Cyan', hexCode: '#2aa198' },
//     { colorName: 'Green', hexCode: '#859900' },
// ];
// const RAINBOW = [
//     { colorName: 'Red', hexCode: '#FF0000' },
//     { colorName: 'Orange', hexCode: '#FF7F00' },
//     { colorName: 'Yellow', hexCode: '#FFFF00' },
//     { colorName: 'Green', hexCode: '#00FF00' },
//     { colorName: 'Violet', hexCode: '#8B00FF' },
// ];

// const FRONTEND_MASTERS = [
//     { colorName: 'Red', hexCode: '#c02d28' },
//     { colorName: 'Black', hexCode: '#3e3e3e' },
//     { colorName: 'Grey', hexCode: '#8a8a8a' },
//     { colorName: 'White', hexCode: '#ffffff' },
//     { colorName: 'Orange', hexCode: '#e66225' },
// ];
// const COLOR_PALETTES = [
//     { paletteName: 'Solarized', colors: SOLARIZED },
//     { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS },
//     { paletteName: 'Rainbow', colors: RAINBOW },
// ];
const Home = ({ navigation }) => {

    const [colorPalettes, setColorPalettes] = useState([]);
    const [IsRefreshing, setIsRefreshing] = useState(false);
    const fetchColorPalettes = useCallback(async () => {
        const result = await fetch(
            'https://color-palette-api.kadikraman.now.sh/palettes',
        );
        if (result.ok) {
            const palettes = await result.json();
            setColorPalettes(palettes);
        }
    }, []);

    useEffect(() => {
        fetchColorPalettes();
    }, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchColorPalettes();
        setTimeout(() => {
           setIsRefreshing(false);
        }, 1000);
    });
    return (
        <View>
            <FlatList
                style={styles.list}
                // data={COLOR_PALETTES}
                data={colorPalettes}
                keyExtractor={item => item.paletteName}
                renderItem={({ item }) => (
                    <PalettePreview
                        handlePress={() => navigation.navigate('ColorPalette', item)}
                        colorPalette={item}
                    />
                    // <TouchableOpacity onPress={() => navigation.navigate('ColorPalette', item)}>
                    //     <Text style={styles.textColor}>{item.paletteName}</Text>
                    // </TouchableOpacity>
                )}
                refreshing={IsRefreshing}
                onRefresh={() => handleRefresh()}
            // refreshControl={
            //     <RefreshControl refreshing={true} onRefresh={() => { }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textColor: {
        color: 'blue',
    },
    list: {
        padding: 10,
    },
});

export default Home;
