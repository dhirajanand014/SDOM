import React, { useEffect, useState } from 'react';
import { FlatList, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import category from '../data/category.json';
import { fetchCategoryData } from '../helper/SDOMHelper.js';
import { categoryViewStyles } from '../styles/sdomStyles';
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';

export function sdomCategory({ navigation }) {
    const [categoryState, setCategoryState] = useState({
        isSelected: false
    })
    useEffect(() => {
        const categoryData = fetchCategoryData();
    }, []);
    let { height } = Dimensions.get("window");
    height += StatusBar.currentHeight;
    return (
        <View>
            <ImageBackground style={categoryViewStyles.categoryView} source={require('../assets/category_backround_image.png')}>
                <FlatList data={category} style={{ height: height }}
                    renderItem={(item) => sdomCategoryRenderer(item, categoryState, setCategoryState)} numColumns={2}
                    keyExtractor={(item, index) => item.id} />
            </ImageBackground>
        </View>
    )
}