import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { SDOMPostSearch } from '../components/SDOMPostSearch';
import {
    stringConstants, postCountTypes
} from '../constants/sdomConstants';
import {
    getFadeInAnimation, postWallPaperAlert, increaseAndSetPostCounts,
    downloadImageFromURL, setOptionsStateForDescription
} from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';

const post_like = require('../assets/post_likes_heart_arrow_icon.png');
const post_like_selected = require('../assets/post_likes_heart_arrow_icon_selected.png');
const post_description = require('../assets/post_description_icon.png');
const post_wallpaper = require('../assets/post_set_wallpaper_icon.png');
const post_download = require('../assets/post_download_icon.png');

const { Value } = Animated;

export const SDOMPostDetails = forwardRef((props, ref) => {

    const { posts, textAnimationValue, optionsState, setOptionsState, sdomDatastate, setSdomDatastate,
        viewPagerRef, width, height, inputTextRef } = props;

    const post_external_link = require('../assets/post_external_link_icon.png');

    const [postDetailsState, setPostDetailsState] = useState({
        currentPostIndex: 0,
        animationVisible: false
    });

    useImperativeHandle(ref,
        () => ({
            setPostIndex(index) {
                setPostDetailsState({ ...postDetailsState, currentPostIndex: index });
            },

            setPostAnimationVisible(isVisible) {
                setPostDetailsState({ ...postDetailsState, animationVisible: isVisible });
            }
        }));

    const input_search_box_translate_x = new Value(width);
    const content_translate_y = new Value(height);
    const content_opacity = new Value(0);

    return (
        <React.Fragment>
            <View key={`1_${postDetailsState.currentPostIndex}_${posts[postDetailsState.currentPostIndex].categoryId}_post_details`}>
                <View style={glancePostStyles.innerContainer}>
                    <Animated.View style={[glancePostStyles.smallButtonsContainer, postDetailsState.animationVisible && getFadeInAnimation(textAnimationValue)]}>
                        <Text style={glancePostStyles.titleName}>{posts[postDetailsState.currentPostIndex].postTitle}</Text>
                        <TouchableOpacity style={{ width: 38 }} onPress={() => Linking.openURL(posts[postDetailsState.currentPostIndex].postLink)}>
                            <Animated.Image style={[glancePostStyles.icon_external_link]} source={post_external_link} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[glancePostStyles.postTitleAndProfileStyle, postDetailsState.animationVisible && getFadeInAnimation(textAnimationValue)]}>
                        <Text style={posts[postDetailsState.currentPostIndex].profileName && glancePostStyles.postProfileName}>
                            {posts[postDetailsState.currentPostIndex].profileName && posts[postDetailsState.currentPostIndex].
                                profileName.toUpperCase()}
                        </Text>
                        <Text style={glancePostStyles.postCategoriesIn}>{
                            posts[postDetailsState.currentPostIndex].profileName && posts[postDetailsState.currentPostIndex].postCategoriesIn &&
                            stringConstants.PIPELINE_JOIN.concat(posts[postDetailsState.currentPostIndex].postCategoriesIn) ||
                            posts[postDetailsState.currentPostIndex].postCategoriesIn}
                        </Text>
                    </Animated.View>
                </View>
            </View>
            <View style={glancePostStyles.searchIconContainer}>
                {
                    optionsState.showSearch &&
                    <SDOMPostSearch sdomDatastate={sdomDatastate} screenWidth={width} screenHeight={height}
                        optionsState={optionsState} setOptionsState={setOptionsState} content_opacity={content_opacity}
                        input_search_box_translate_x={input_search_box_translate_x} content_translate_y={content_translate_y}
                        inputBoxTranslateX={input_search_box_translate_x} contentTranslateY={content_translate_y}
                        contentOpacity={content_opacity} inputTextRef={inputTextRef} viewPagerRef={viewPagerRef}
                        post={posts[postDetailsState.currentPostIndex]} />
                }
            </View>
            <View style={glancePostStyles.largeButtonContainer}>
                <View style={glancePostStyles.glanceTopIconInfo}>
                    <TouchableOpacity style={glancePostStyles.backgroundIconSpacing} onPress={() =>
                        setOptionsStateForDescription(optionsState, setOptionsState, posts[postDetailsState.currentPostIndex],
                            postDetailsState, setPostDetailsState)}>
                        <Image style={glancePostStyles.icon_post_description} source={post_description} />
                    </TouchableOpacity>
                </View>
                <View style={glancePostStyles.glanceTopIconLike}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} disabled={posts[postDetailsState.currentPostIndex].likeDisabled}
                        onPress={async () => await increaseAndSetPostCounts(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate,
                            postCountTypes.POST_LIKES, postDetailsState, setPostDetailsState)}>
                        <Image style={glancePostStyles.icon_post_like} source={posts[postDetailsState.currentPostIndex].likeDisabled &&
                            post_like_selected || post_like} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postLikes}</Text>
                </View>
                <View style={glancePostStyles.glanceTopIcons}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () => await
                        postWallPaperAlert(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate)}>
                        <Image style={glancePostStyles.icon_post_wallpaper} source={post_wallpaper} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postWallPapers}</Text>
                </View>
                <View style={glancePostStyles.glanceTopIcons}>
                    <TouchableOpacity style={glancePostStyles.backgroundRoundColor} onPress={async () =>
                        await downloadImageFromURL(posts[postDetailsState.currentPostIndex], sdomDatastate, setSdomDatastate)}>
                        <Image style={glancePostStyles.icon_post_download} source={post_download} />
                    </TouchableOpacity>
                    <Text style={glancePostStyles.icon_count_text}>{posts[postDetailsState.currentPostIndex].postDownloads}</Text>
                </View>
            </View>
        </React.Fragment>
    )
});