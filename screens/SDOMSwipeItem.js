import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

export const SDOMSwipeItem = (props) => {

    const { width, height, item, index, postImageParallax } = props;
    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

    const verticalSpeed = Math.abs(height * 0.5 - height)

    const postImageParallax_translate_y = useDerivedValue(() => {
        return interpolate(postImageParallax.value, [(index - 1) * height, index * height, (index + 1) * height],
            [-verticalSpeed, 0, verticalSpeed], Extrapolate.CLAMP)
    });

    const postTransformParallax = useAnimatedStyle(() => ({ transform: [{ translateY: postImageParallax_translate_y.value }] }));

    return (
        <Animated.View key={`${index}_${item.categoryId}`}>
            <AnimatedFastImage style={[{ width: width, height: height }]} source={{
                uri: item.postImage,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable
            }} />
        </Animated.View>)
}