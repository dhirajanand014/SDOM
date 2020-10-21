import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Dimensions, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SDOMCategoryContext } from '../App';
import { categoryViewStyles } from '../styles/sdomStyles';
import { saveCategoryButtonType, saveCategoryIdsToStorage } from '../helper/SDOMHelper'
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';

export function SDOMCategory({ navigation }) {

    const { fetchCategories, initialCategorySelection } = useContext(SDOMCategoryContext);

    const [category, setCategory] = useState({
        categories: [],
        initialCategory: ''
    });

    useEffect(() => {
        fetchCategories(category, setCategory, initialCategorySelection);
    }, []);

    let { height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    return (
        <View style={categoryViewStyles.categoryView} >
            <FlatList data={category.categories}
                renderItem={({ item, index }) => sdomCategoryRenderer(item, index, category, setCategory)} numColumns={3}
                keyExtractor={(item, index) => item.categoryId} />
            {
                category.initialCategory == 'skipButton' &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity onPress={async () => {
                        await saveCategoryButtonType('saveButton');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Glance" }],
                        });
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <Text style={categoryViewStyles.textSave}>{`Skip >>`}</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                category.initialCategory == 'saveButton' &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity onPress={async () => {
                        const categoryIds = category.categories.filter(item => item.isSelected).map(selectedCategory => {
                            const categoryJson = {
                                selectedCategoryId: selectedCategory.categoryId,
                                selectedCategoryTitle: selectedCategory.categoryTitle
                            }
                            return categoryJson;
                        });
                        const jsonCategoryIds = JSON.stringify(categoryIds);
                        await saveCategoryIdsToStorage(jsonCategoryIds);
                        await saveCategoryButtonType('saveButton');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Glance" }],
                        });
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <Text style={categoryViewStyles.textSave}>Save</Text>
                    </TouchableOpacity>
                </View>
            }

        </View >
    )
}