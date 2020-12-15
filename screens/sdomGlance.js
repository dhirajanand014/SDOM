import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { stringConstants } from '../constants/sdomConstants';
import { onSwiperScrollEnd, fetchPostsAndSaveToState, resetAnimatePostTextDetails } from '../helper/SDOMHelper';
import { SDOMPostDescriptionModal } from '../components/SDOMPostDescriptionModal';
import { SDOMPostReportAbuseModal } from '../components/SDOMPostReportAbuseModal';
import { glancePostStyles } from '../styles/sdomStyles';
import Animated, { useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';
import Swiper from 'react-native-swiper';
import { SDOMSwipeItem } from './SDOMSwipeItem'
import { SDOMPostDetails } from './SDOMPostDetails';
import FastImage from 'react-native-fast-image';

const category_selection = require('../assets/category_selection_icon.png');
const post_report_abuse = require('../assets/post_report_abuse_icon.png');

export function sdomGlance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);
    const [optionsState, setOptionsState] = useState({
        descriptionModal: false,
        reportAbuseModal: false,
        showSearch: false,
        selectedPost: stringConstants.EMPTY,
        selectedReportAbuse: {},
        reportAbuses: [],
        reportAbuseSubmitDisabled: false
    });

    const viewPagerRef = useRef(null);

    const postDetailsRef = useRef(null);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    const textPostDescriptionAnimationValue = useSharedValue(-10);
    const textPostTypeAnimationValue = useSharedValue(-10);

    const postImageParallax = useSharedValue(0);

    const textPostDescriptionAnimationValue_translate_x = useDerivedValue(() => {
        return textPostDescriptionAnimationValue.value * 100;
    });

    const textPostTypeAnimationValue_translate_x = useDerivedValue(() => {
        return textPostTypeAnimationValue.value * 100;
    });

    const onPostScrollFunction = (event) => {
        'worklet';
        postImageParallax.value = event.nativeEvent.contentOffset.y;
    }

    const onPostScroll = useAnimatedScrollHandler({
        onScroll: onPostScrollFunction,
    });

    console.log(sdomDatastate);

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={glancePostStyles.category_selection}
                onPress={() => navigation.navigate("Category")}>
                <Image source={category_selection} style={glancePostStyles.category_selection_image} />
            </TouchableOpacity>
            {
                sdomDatastate.posts && sdomDatastate.posts.length &&
                <View style={{ flex: 1 }}>
                    <Swiper ref={viewPagerRef} index={postDetailsRef?.current?.postIndex} horizontal={false} showsPagination={false} scrollEventThrottle={16}
                        bounces={true} loop onMomentumScrollBegin={(event) => postDetailsRef?.current?.setPostAnimationVisible(true)}
                        onMomentumScrollEnd={(event) => onSwiperScrollEnd(event, postDetailsRef, textPostDescriptionAnimationValue_translate_x, textPostTypeAnimationValue_translate_x)}
                        onScroll={(event) => {
                            resetAnimatePostTextDetails(textPostDescriptionAnimationValue_translate_x,
                                textPostTypeAnimationValue_translate_x);
                            //onPostScrollFunction(event);
                        }} loadMinimalLoader={
                            <FastImage style={glancePostStyles.preloaderStyle} source={{
                                uri: Image.resolveAssetSource(require(`../assets/wallpiper-preloader.gif`)).uri,
                                priority: FastImage.priority.normal
                            }} />
                        }>
                        {
                            sdomDatastate.posts.map((item, index) => {
                                return <Animated.View key={index}>
                                    <SDOMSwipeItem width={width} height={height} item={item} index={index}
                                        postImageParallax={postImageParallax} />
                                </Animated.View>
                            })}
                    </Swiper>

                    <SDOMPostDetails ref={postDetailsRef} posts={sdomDatastate.posts} textPostTypeAnimationValue={textPostTypeAnimationValue_translate_x}
                        width={width} height={height} optionsState={optionsState} setOptionsState={setOptionsState}
                        sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} optionsState={optionsState}
                        setOptionsState={setOptionsState} viewPagerRef={viewPagerRef} textPostDescriptionAnimationValue={textPostDescriptionAnimationValue_translate_x} />
                </View> || <View>
                    <Shimmer style={{ width: width, height: height }} duration={500} direction="up" tilt={45}>
                        <View style={glancePostStyles.shimmerViewInit}>
                            <FastImage style={glancePostStyles.preloaderStyle} source={{
                                uri: Image.resolveAssetSource(require(`../assets/wallpiper-preloader.gif`)).uri,
                                priority: FastImage.priority.normal
                            }} />
                        </View>
                    </Shimmer>
                </View>
            }
            <SDOMPostDescriptionModal optionsState={optionsState} setOptionsState={setOptionsState}
                reportAbuseIcon={post_report_abuse} />
            <SDOMPostReportAbuseModal optionsState={optionsState} setOptionsState={setOptionsState} />
        </View >
    );
}