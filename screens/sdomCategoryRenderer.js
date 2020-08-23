import React from 'react'
import { TouchableOpacity, ImageBackground } from 'react-native';
import { flatListItemStyles } from '../styles/sdomStyles';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const sdomCategoryRenderer = ({ item }, categoryState, setCategoryState) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}
            onPress={() => setCategoryState({ ...categoryState, isSelected: !categoryState.isSelected })}>
            <Surface style={flatListItemStyles.cardSurface}>
                <ImageBackground source={{ uri: item.categoryCover }}
                    style={categoryState.isSelected ? flatListItemStyles.checkBoxSelected : flatListItemStyles.imageBackGround}>
                    <Text style={flatListItemStyles.GridViewTextLayout}>{item.categoryTitle}</Text>
                    {
                        categoryState.isSelected && <Icon name='check' size={80} color="black" style={{ alignSelf: "center" }} />
                    }
                </ImageBackground>
            </Surface>
        </TouchableOpacity>
    )
}