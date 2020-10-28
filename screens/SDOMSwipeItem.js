import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

export const SDOMSwipeItem = (props) => {

    const { width, height, item, index } = props;

    return (
        <View key={`0_${index}_${item.categoryId}`}>
            <FastImage style={[{ width: width, height: height }]} source={{
                uri: item.postImage,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable
            }} />
        </View>)
}