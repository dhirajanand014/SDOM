import React, { useEffect, useContext } from 'react';
import { FlatList, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import { SDOMCategoryContext } from '../App';
import { categoryViewStyles } from '../styles/sdomStyles';
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';

export function sdomCategory({ navigation }) {

    const { category, fetchCategories } = useContext(SDOMCategoryContext);

    useEffect(() => {
        debugger
        (async () => {
            await fetchCategories();
        })();
    }, []);

    let { height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    return (
        <View>
            <ImageBackground style={categoryViewStyles.categoryView} source={require('../assets/category_backround_image.png')}>
                <FlatList data={category.categories} style={{ height: height }}
                    renderItem={({ item, index }) => sdomCategoryRenderer(item, index, category)} numColumns={2}
                    keyExtractor={(item, index) => item.categoryId} />
            </ImageBackground>
        </View>
    )
}