import React from 'react'
import { TouchableOpacity, ImageBackground } from 'react-native';
import { flatListItemStyles } from '../styles/sdomStyles';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
                    <Text style={flatListItemStyles.GridViewTextLayout}>{categoryTitle}</Text>
                    {
                        category.categories[index].isSelected &&
                        <Icon name='check' size={80} color="black" style={{ alignSelf: "center" }} />
                    }
                </ImageBackground>
            </Surface>
        </TouchableOpacity>
    )
}