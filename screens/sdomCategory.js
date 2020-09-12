import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, ImageBackground, Dimensions, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SDOMCategoryContext } from '../App';
import { categoryViewStyles, headerStyles } from '../styles/sdomStyles';
import { saveCategoryIdsToStorage } from '../helper/SDOMHelper'
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';

export function SDOMCategory({ navigation }) {

    const { fetchCategories } = useContext(SDOMCategoryContext);

    const [category, setCategory] = useState({
        categories: []
    });

    category.categories.some(item => item.isSelected) && navigation.setOptions({
        headerRight: () =>
            <TouchableOpacity style={headerStyles.headerSave}
                onPress={async () => {
                    const categoryIds = category.categories.filter(item => item.isSelected).map(selectedCategory => {
                        return selectedCategory.categoryId
                    });
                    const jsonCategoryIds = JSON.stringify(categoryIds);
                    await saveCategoryIdsToStorage(jsonCategoryIds);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Glance" }],
                    });
                }}>
                <Text style={headerStyles.textSave}>Save</Text>
            </TouchableOpacity>
    })

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