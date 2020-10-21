
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { postCountTypes, stringConstants } from '../constants/sdomConstants';
import {
    fetchPostsAndSaveToState, postWallPaperAlert,
    increaseAndSetPostCounts,
    downloadImageFromURL, setOptionsStateForDescription
} from '../helper/SDOMHelper';
import { SDOMPostDescriptionModal } from '../components/SDOMPostDescriptionModal';
import { SDOMPostReportAbuseModal } from '../components/SDOMPostReportAbuseModal';
import { glancePostStyles } from '../styles/sdomStyles';
import FastImage from 'react-native-fast-image';
import { SDOMPostSearch } from '../components/SDOMPostSearch';
import Animated from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';
const { Value } = Animated;

const post_like = require('../assets/post_likes_heart_arrow_icon.png');
const post_like_selected = require('../assets/post_likes_heart_arrow_icon_selected.png');
const post_external_link = require('../assets/post_external_link_icon.png')
const post_description = require('../assets/post_description_icon.png');
const post_wallpaper = require('../assets/post_set_wallpaper_icon.png');
const category_selection = require('../assets/category_selection_icon.png');
const post_download = require('../assets/post_download_icon.png');
const post_report_abuse = require('../assets/post_report_abuse_icon.png');

export function sdomGlance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);
    const [optionsState, setOptionsState] = useState({
        descriptionModal: false,
        reportAbuseModal: false,
        showSearch: false,
        lastPageScrolled: false,
        currentPageIndex: 0,
        selectedPost: stringConstants.EMPTY,
        selectedReportAbuse: {},
        reportAbuses: [],
        reportAbuseSubmitDisabled: false
    });

    const inputTextRef = useRef(null);
    const viewPagerRef = useRef(null);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    const input_search_box_translate_x = new Value(width);
    const content_translate_y = new Value(height);
    const content_opacity = new Value(0);

    console.log(sdomDatastate)
    return (
        <View>
            <TouchableOpacity style={glancePostStyles.category_selection}
                onPress={() => navigation.navigate("Category")}>
                <Image source={category_selection} style={glancePostStyles.category_selection_image} />
            </TouchableOpacity>
            <ViewPager ref={viewPagerRef} peekEnabled style={{ width: width, height: height }} orientation="vertical"
                transitionStyle="scroll" onPageScroll={(event) => {
                    if (sdomDatastate.posts && optionsState.lastPageScrolled &&
                        sdomDatastate.posts.length - 1 == optionsState.currentPageIndex) {
                        viewPagerRef.current.setPage(0);
                        optionsState.lastPageScrolled = false;
                    }
                    setOptionsState({ ...optionsState, currentPageIndex: event.nativeEvent.position });
                }}
                onPageScrollStateChanged={(event) => {
                    optionsState.currentPageIndex == sdomDatastate.posts.length - 1 &&
                        !optionsState.lastPageScrolled &&
                        'idle' == event.nativeEvent.pageScrollState &&
                        setOptionsState({
                            ...optionsState,
                            lastPageScrolled: true
                        })
                }}>
                {
                    sdomDatastate.posts && sdomDatastate.posts.map((item, index) => {
                        return (
                            <View key={`0_${index}_${item.categoryId}`}>
                                <View key={`1_${index}_${item.categoryId}`}>
                                    <FastImage source={{
                                        uri: item.postImage,
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable
                                    }} style={{ width, height: height }} />
                                    <View style={glancePostStyles.innerContainer}>
                                        <View style={glancePostStyles.smallButtonsContainer}>
                                            <Text style={glancePostStyles.titleName}>{item.postTitle}</Text>
                                            <TouchableOpacity style={{ width: 38 }} onPress={() => Linking.openURL(item.postLink)}>
                                                <Image style={glancePostStyles.icon_external_link} source={post_external_link} />
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
                            </View>
                        )
                    }) ||
                    <Shimmer duration={500} direction="up" tilt={45}>
                        <View style={glancePostStyles.shimmerViewInit}>
                            <ActivityIndicator color="#de4463" hidesWhenStopped size="small" />
                        </View>
                    </Shimmer>
                }
            </ViewPager>
            <SDOMPostDescriptionModal optionsState={optionsState} setOptionsState={setOptionsState}
                reportAbuseIcon={post_report_abuse} />
            <SDOMPostReportAbuseModal optionsState={optionsState} setOptionsState={setOptionsState} />
        </View >
    );
}