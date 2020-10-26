import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { postCountTypes, stringConstants } from '../constants/sdomConstants';
import {
    postWallPaperAlert,
    increaseAndSetPostCounts,
    downloadImageFromURL, setOptionsStateForDescription
} from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';
import FastImage from 'react-native-fast-image';
import { SDOMPostSearch } from '../components/SDOMPostSearch';
import Animated from 'react-native-reanimated';

const { Value } = Animated;

const post_like = require('../assets/post_likes_heart_arrow_icon.png');
const post_like_selected = require('../assets/post_likes_heart_arrow_icon_selected.png');
const post_external_link = require('../assets/post_external_link_icon.png')
const post_description = require('../assets/post_description_icon.png');
const post_wallpaper = require('../assets/post_set_wallpaper_icon.png');
const post_download = require('../assets/post_download_icon.png');

export const SDOMSwipeItem = (props) => {

    const { inputTextRef, width, height, item, index, sdomDatastate, setSdomDatastate, optionsState,
        setOptionsState, viewPagerRef, animatedValue, verticalSpeed } = props;
    const input_search_box_translate_x = new Value(width);
    const content_translate_y = new Value(height);
    const content_opacity = new Value(0);

    const verticalStyles = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [
                        (index - 1) * height,
                        index * height,
                        (index + 1) * height,
                    ],
                    outputRange: [-verticalSpeed, 0, verticalSpeed],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    const getPageTransformStyle = index => ({
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [
                        (index - 1) * (width + 8), // Add 8 for dividerWidth
                        index * (width + 8),
                        (index + 1) * (width + 8)
                    ],
                    outputRange: [0, 1, 0],
                    extrapolate: "clamp"
                })
            },
            {
                rotate: animatedValue.interpolate({
                    inputRange: [
                        (index - 1) * (width + 8),
                        index * (width + 8),
                        (index + 1) * (width + 8)
                    ],
                    outputRange: ["180deg", "0deg", "-180deg"],
                    extrapolate: "clamp"
                })
            }
        ]
    });

    const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
    return (
        <View key={`0_${index}_${item.categoryId}`}>
            <View key={`1_${index}_${item.categoryId}`}>
                <AnimatedFastImage style={[{ width: width, height: height }]} source={{
                    uri: item.postImage,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable
                }} />
                <View style={glancePostStyles.innerContainer}>
                    <View style={glancePostStyles.smallButtonsContainer}>
                        <Text style={glancePostStyles.titleName}>{item.postTitle}</Text>
                        <TouchableOpacity style={{ width: 38 }} onPress={() => Linking.openURL(item.postLink)}>
                            <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                        </TouchableOpacity>
                    </View>
                    <View style={glancePostStyles.postTitleAndProfileStyle}>
                        <Text style={item.profileName && glancePostStyles.postProfileName}>
                            {item.profileName && item.profileName.toUpperCase()}
                        </Text>
                        <Text style={glancePostStyles.postCategoriesIn}>{
                            item.profileName && item.postCategoriesIn && stringConstants.PIPELINE_JOIN.
                                concat(item.postCategoriesIn) || item.postCategoriesIn}
                        </Text>
                    </View>
                </View>
            </View>
            <View key={`2_${index}_${item.categoryId}_search_icon`} style={glancePostStyles.searchIconContainer}>
                {
                    optionsState.showSearch &&
                    <SDOMPostSearch sdomDatastate={sdomDatastate} screenWidth={width} screenHeight={height}
                        optionsState={optionsState} setOptionsState={setOptionsState} content_opacity={content_opacity}
                        input_search_box_translate_x={input_search_box_translate_x} content_translate_y={content_translate_y}
                        inputBoxTranslateX={input_search_box_translate_x} contentTranslateY={content_translate_y}
                        contentOpacity={content_opacity} inputTextRef={inputTextRef} viewPagerRef={viewPagerRef}
                        post={item} /> || <View />
                }
            </View>
            <View key={`3_${index}_${item.categoryId}`} style={glancePostStyles.largeButtonContainer}>
                <View style={glancePostStyles.glanceTopIconInfo}>
                    <TouchableOpacity style={glancePostStyles.backgroundIconSpacing} onPress={() =>
                        setOptionsStateForDescription(optionsState, setOptionsState, item)}>
                        <Image style={glancePostStyles.icon_post_description} source={post_description} />
                    </TouchableOpacity>
                </View>
                <View style={glancePostStyles.glanceTopIconLike}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} disabled={item.likeDisabled} onPress={async () => {
                        await increaseAndSetPostCounts(item, sdomDatastate, setSdomDatastate, postCountTypes.POST_LIKES);
                    }}>
                        <Image style={glancePostStyles.icon_post_like} source={item.likeDisabled && post_like_selected
                            || post_like} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{item.postLikes}</Text>
                </View>
                <View style={glancePostStyles.glanceTopIcons}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => {
                        await postWallPaperAlert(item, sdomDatastate, setSdomDatastate);
                    }}>
                        <Image style={glancePostStyles.icon_post_wallpaper} source={post_wallpaper} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{item.postWallPapers}</Text>
                </View>
                <View style={glancePostStyles.glanceTopIcons}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => {
                        await downloadImageFromURL(item, sdomDatastate, setSdomDatastate);
                    }}>
                        <Image style={glancePostStyles.icon_post_download} source={post_download} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{item.postDownloads}</Text>
                </View>
            </View>
        </View>)
}