import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { stringConstants } from '../constants/sdomConstants';
import { animatePostTextDetails, fetchPostsAndSaveToState } from '../helper/SDOMHelper';
import { SDOMPostDescriptionModal } from '../components/SDOMPostDescriptionModal';
import { SDOMPostReportAbuseModal } from '../components/SDOMPostReportAbuseModal';
import { glancePostStyles } from '../styles/sdomStyles';
import Animated from 'react-native-reanimated';
import Shimmer from 'react-native-shimmer';
import Swiper from 'react-native-swiper';
import { SDOMSwipeItem } from './SDOMSwipeItem'
import { SDOMPostDetails } from './SDOMPostDetails';

const { Value } = Animated;

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

    const inputTextRef = useRef(null);
    const viewPagerRef = useRef(null);

    const postDetailsRef = useRef(null);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate, optionsState, setOptionsState);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    const textAnimationValue = new Value(0);

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
                    <Swiper ref={viewPagerRef} index={optionsState.currentPostIndex} horizontal={false} showsPagination={false}
                        bounces={true} loop onIndexChanged={(index) => animatePostTextDetails(textAnimationValue)}
                        onMomentumScrollBegin={(event) => {
                            postDetailsRef.current && postDetailsRef.current.setPostAnimationVisible(true);
                        }}
                        onMomentumScrollEnd={(event) =>
                            postDetailsRef.current && postDetailsRef.current.setPostIndex(
                                Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - 1)}>
                        {
                            sdomDatastate.posts.map((item, index) => {
                                return <View key={index}>
                                    <SDOMSwipeItem width={width} height={height} item={item} index={index} />
                                </View>
                            })}
                    </Swiper>

                    <SDOMPostDetails ref={postDetailsRef} posts={sdomDatastate.posts} textAnimationValue={textAnimationValue}
                        width={width} height={height} optionsState={optionsState} setOptionsState={setOptionsState} inputTextRef={inputTextRef}
                        sdomDatastate={sdomDatastate} setSdomDatastate={setSdomDatastate} optionsState={optionsState}
                        setOptionsState={setOptionsState} viewPagerRef={viewPagerRef} textAnimationValue={textAnimationValue} />
                </View> || <View>
                    <Shimmer style={{ width: width, height: height }} duration={500} direction="up" tilt={45}>
                        <View style={glancePostStyles.shimmerViewInit}>
                            <ActivityIndicator color="#de4463" hidesWhenStopped size="small" />
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