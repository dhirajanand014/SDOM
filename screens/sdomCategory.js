import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, ImageBackground, Dimensions, StatusBar, Text } from 'react-native';
import { SDOMCategoryContext } from '../App';
import { categoryViewStyles } from '../styles/sdomStyles';
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';
import ViewPager from '@react-native-community/viewpager';

export function SDOMCategory({ navigation }) {

    const { fetchCategories } = useContext(SDOMCategoryContext);

    const [category, setCategory] = useState({
        categories: []
    });

    useEffect(() => {
        fetchCategories(category, setCategory);
    }, []);

    let { height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    return (
        <View>
            <ImageBackground style={categoryViewStyles.categoryView} style={{ backgroundColor: '#3d3d3d' }}>
                <FlatList data={category.categories} style={{ height: height }}
                    renderItem={({ item, index }) => sdomCategoryRenderer(item, index, category, setCategory)} numColumns={2}
                    keyExtractor={(item, index) => item.categoryId} />
            </ImageBackground>
        </View>
    )
}