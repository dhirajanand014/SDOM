import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import category from '../data/category.json';
import { fetchCategoryData } from '../helper/SDOMHelper.js';
import { sdomCategoryRenderer } from './sdomCategoryRenderer.js';

export function sdomCategory({ navigation }) {
    const [categoryState, setCategoryState] = useState({
        isSelected: false
    })
    useEffect(() => {
        const categoryData = fetchCategoryData();
    }, []);
    return (
        <View>
            <View>
                <Text style={{ fontSize: 48 }}>Discover Categories</Text>
            </View>
            <FlatList data={category}
                renderItem={(item) => sdomCategoryRenderer(item, categoryState, setCategoryState)} numColumns={2}
                keyExtractor={(item, index) => item.id} />
            <Button title="Go to glance" onPress={() => navigation.push('SDOMGlance')}></Button>
        </View >
    )
}