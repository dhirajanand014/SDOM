import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import category from '../data/category.json'
import { sdomCategoryRenderer, addCategoryRenderer } from './sdomCategoryRenderer.js';
import { flatListItemStyles } from '../styles/sdomStyles.js';

export function sdomCategory({ navigation }) {
    useEffect(() => {

    }, []);
    return (
        <View>
            <FlatList styles={flatListItemStyles.container} data={formatData(category, 2)} renderItem={sdomCategoryRenderer}
                ListFooterComponent={addCategoryRenderer} numColumns={2}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    )
}