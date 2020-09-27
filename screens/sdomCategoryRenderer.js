import React from 'react'
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import { stringConstants } from '../constants/sdomConstants';
import { getCategoryButtonType } from '../helper/SDOMHelper';
import { flatListItemStyles } from '../styles/sdomStyles';

export const sdomCategoryRenderer = (item, index, category, setCategory) => {
    const { categoryCover } = item;
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={async () => {
                category.categories[index].isSelected = !category.categories[index].isSelected;

                const initialCategoryFromStorage = await getCategoryButtonType();
                const initialCategory = ((!initialCategoryFromStorage == stringConstants.EMPTY && initialCategoryFromStorage == 'saveButton')
                    || category.categories.some((item) => { return true == item.isSelected })) && 'saveButton' || 'skipButton';
                setCategory({ ...category, initialCategory: initialCategory });
            }}>
            <View style={flatListItemStyles.cardSurface}>
                <ImageBackground source={{ uri: categoryCover }}
                    style={category.categories[index].isSelected ? flatListItemStyles.checkBoxSelected : flatListItemStyles.imageBackGround}>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}