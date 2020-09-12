import React from 'react'
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import { flatListItemStyles } from '../styles/sdomStyles';

export const sdomCategoryRenderer = (item, index, category, setCategory) => {
    const { categoryCover, categoryTitle } = item;
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={() => {
                category.categories[index].isSelected = !category.categories[index].isSelected;
                setCategory({ ...category });
            }}>
            <View style={flatListItemStyles.cardSurface}>
                <ImageBackground source={{ uri: categoryCover }}
                    style={category.categories[index].isSelected ? flatListItemStyles.checkBoxSelected : flatListItemStyles.imageBackGround}>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}