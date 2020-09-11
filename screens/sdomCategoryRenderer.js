import React from 'react'
import { TouchableOpacity, ImageBackground } from 'react-native';
import { flatListItemStyles } from '../styles/sdomStyles';
import { Surface, Text } from 'react-native-paper';

export const sdomCategoryRenderer = (item, index, category, setCategory) => {
    const { categoryCover, categoryTitle } = item;
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={() => {
                category.categories[index].isSelected = !category.categories[index].isSelected;
                setCategory({ ...category });
            }}>
            <Surface style={flatListItemStyles.cardSurface}>
                <ImageBackground source={{ uri: categoryCover }}
                    style={category.categories[index].isSelected ? flatListItemStyles.checkBoxSelected : flatListItemStyles.imageBackGround}>
                </ImageBackground>
            </Surface>
        </TouchableOpacity>
    )
}