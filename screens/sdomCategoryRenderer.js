import React from 'react'
import { Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { flatListItemStyles } from '../styles/sdomStyles';
import CheckBox from '@react-native-community/checkbox';

export const sdomCategoryRenderer = ({ item }, categoryState, setCategoryState) => {
    return (
        <ScrollView>
            <TouchableOpacity activeOpacity={.7} style={flatListItemStyles.GridViewContainer}>
                <ImageBackground source={{ uri: item.categoryCover }} imageStyle={{ opacity: 0.5 }}
                    style={flatListItemStyles.sdomCategoryImageRenderer}>
                    <Text style={flatListItemStyles.GridViewTextLayout}>{item.categoryTitle}</Text>
                    <CheckBox value={categoryState.isSelected}
                        onValueChange={(value) => setCategoryState({ ...categoryState, isSelected: value })}
                        style={flatListItemStyles.checkbox} tintColors={{ true: '#2196F3', false: 'pink' }} />
                </ImageBackground>
            </TouchableOpacity>
        </ScrollView>
    )
}