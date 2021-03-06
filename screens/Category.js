import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Dimensions, StatusBar, Text, TouchableOpacity, BackHandler } from 'react-native';
import { CategoryContext } from '../App';
import { categoryViewStyles } from '../styles/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveCategoryButtonType, saveCategoryIdsToStorage } from '../helper/Helper'
import { CategoryRenderer } from './CategoryRenderer.js';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { backHandlerConstants } from '../constants/Constants';

export function Category() {

    const { fetchCategories, initialCategorySelection } = useContext(CategoryContext);

    const navigation = useNavigation();
    const route = useRoute();

    const { canStart, start, stop } = useTourGuideController();

    const [category, setCategory] = useState({
        categories: [],
        initialCategory: ''
    });

    useEffect(() => {
        fetchCategories(category, setCategory, initialCategorySelection);
        const backHandler = BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, () => {
            if (route.params && route.params.fromIntro) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (canStart) {
            start();
        }
    }, [canStart]);

    let { height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    return (
        <View style={categoryViewStyles.categoryView} >
            <FlatList data={category.categories}
                renderItem={({ item, index }) => CategoryRenderer(item, index, category, setCategory)} numColumns={3}
                keyExtractor={(item) => item.categoryId} />
            {
                category.initialCategory == 'skipButton' &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
                        await saveCategoryButtonType('saveButton');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Glance" }],
                        });
                        stop();
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <TourGuideZone zone={3} borderRadius={30} shape={`rectangle`}
                            style={categoryViewStyles.skipTourZoneStyle} text={`Skip or save categories to view posts!`}>
                            <Text style={categoryViewStyles.textSave}>{`Skip >>`}</Text>
                        </TourGuideZone>
                    </TouchableOpacity>
                </View>
            }
            {
                category.initialCategory == 'saveButton' &&
                <View style={categoryViewStyles.bottomButtonLayout}>
                    <TouchableOpacity activeOpacity={.7} onPress={async () => {
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
                        stop();
                    }} style={categoryViewStyles.saveButtonContainer}>
                        <Text style={categoryViewStyles.textSave}>Save</Text>
                    </TouchableOpacity>
                </View>
            }

        </View >
    )
}