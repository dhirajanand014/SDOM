
import React, { useState, useEffect } from 'react';
import { DrawerActions } from '@react-navigation/native';

import {
    Animated,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
    StatusBar
} from 'react-native';
import {
    ParallaxSwiper,
    ParallaxSwiperPage
} from "react-native-parallax-swiper";
import ViewPager from '@react-native-community/viewpager';
import { fetchPostsAndSaveToState } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image';

const smallRetweetIcon = require('../assets/retweet.png');
const smallHeartIcon = require('../assets/heart-small.png');
const smallEllipsesIcon = require('../assets/ellipses.png');
const xIcon = require('../assets/x.png');
const heartIcon = require('../assets/heart-big.png');
const shareIcon = require('../assets/share.png');


export function sdomGlance({ navigation }) {
    const [sdomDatastate, setSdomDatastate] = useState([]);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;
    const myCustomAnimatedValue = new Animated.Value(0);

    const getPageTransformStyle = (index) => ({
        transform: [
            {
                scale: myCustomAnimatedValue.interpolate({
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
                rotate: myCustomAnimatedValue.interpolate({
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
    console.log(sdomDatastate)
    return (
        <View>
            <TouchableOpacity style={{ alignItems: "flex-end", position: "absolute", zIndex: 100, top: 50, left: 10, padding: 10 }}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon size={25} color="black" name="bars" />
            </TouchableOpacity>

            <ViewPager style={{ width: width, height: height }} orientation={"vertical"} transitionStyle={"scroll"}
                onPageScroll={(e) => getPageTransformStyle(e.nativeEvent.position)} initialPage={0}>
                {
                    sdomDatastate.posts && sdomDatastate.posts.map((item, index) => {
                        return (
                            <View>
                                <View key={index}>
                                    <Image source={{ uri: item.postImage }} style={{ width, height: height }} />
                                    <View style={glancePostStyles.innerContainer} colors={['transparent', 'black']}>
                                        <Text style={glancePostStyles.titleName}>
                                            {item.postTitle}
                                        </Text>
                                        <Text style={glancePostStyles.descriptionText}>
                                            {item.postDescription}
                                        </Text>
                                        <View style={glancePostStyles.smallButtonsContainer}>
                                            <View style={glancePostStyles.bottomIconsContainer}>
                                                <View style={[glancePostStyles.buttonWithTextContainer]}>
                                                    <View
                                                        style={[
                                                            glancePostStyles.smallButtonContainer,
                                                            glancePostStyles.smallButtonWithTextIconContainer,
                                                        ]} >
                                                        <TouchableOpacity onPress={() => Linking.openURL(item.postLink)}>
                                                            <Text style={{ color: 'white' }}>
                                                                Read more
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <Image style={glancePostStyles.icon} source={smallEllipsesIcon} />
                                        </View>
                                    </View>
                                </View>

                                <View style={[glancePostStyles.largeButtonContainer, { right: 64 }]}>
                                    <TouchableOpacity>
                                        <Image style={glancePostStyles.icon} source={heartIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[glancePostStyles.largeButtonContainer, { right: 12 }]}>
                                    <TouchableOpacity>
                                        <Image style={glancePostStyles.icon} source={shareIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={glancePostStyles.progressBarContainer}>
                                    {sdomDatastate.posts &&
                                        <Animated.View
                                            style={[
                                                glancePostStyles.progressBar,
                                                {
                                                    transform: [
                                                        {
                                                            translateX: myCustomAnimatedValue.interpolate({
                                                                inputRange: [0, (width + 6) * (sdomDatastate.posts.length - 1)],
                                                                outputRange: [-width, 0],
                                                                extrapolate: 'clamp',
                                                            }),
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    }
                                </View>
                            </View>
                        )
                    })}
            </ViewPager>


            {/* <ParallaxSwiper
                speed={0.75}
                animatedValue={myCustomAnimatedValue}
                dividerWidth={6}
                vertical={true}
                dividerColor="black"
                onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
                progressBarBackgroundColor="rgba(0,0,0,0.25)"
                progressBarValueBackgroundColor="white">
                {
                    sdomDatastate.posts && sdomDatastate.posts.map((item, index) => {
                        return (
                            <ParallaxSwiperPage key={item.postId}
                                BackgroundComponent={
                                    <FastImage source={{ uri: item.postImage }} priority={FastImage.priority.low}
                                        cache={FastImage.cacheControl.immutable} style={{ width, height: height }} />
                                }
                                ForegroundComponent={
                                    <View style={glancePostStyles.innerContainer} colors={['transparent', 'black']}>
                                        <View style={glancePostStyles.titleContainer}>
                                            <Text style={glancePostStyles.titleName}>
                                                {item.postTitle}
                                            </Text>
                                        </View>
                                        <View style={glancePostStyles.descriptionContainer}>
                                            <Text style={glancePostStyles.descriptionText}>
                                                {item.postDescription}
                                            </Text>
                                        </View>
                                        <View style={glancePostStyles.smallButtonsContainer}>
                                            <View style={glancePostStyles.bottomIconsContainer}>
                                                <View style={[glancePostStyles.buttonWithTextContainer]}>
                                                    <View
                                                        style={[
                                                            glancePostStyles.smallButtonContainer,
                                                            glancePostStyles.smallButtonWithTextIconContainer,
                                                        ]} >
                                                        <TouchableOpacity onPress={() => Linking.openURL(item.postLink)}>
                                                            <Text style={{ color: 'white' }}>
                                                                Read more
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <Image style={glancePostStyles.icon} source={smallEllipsesIcon} />
                                        </View>
                                    </View>
                                } />
                        )
                    })
                }
            </ParallaxSwiper>

            <View style={[glancePostStyles.largeButtonContainer, { right: 64 }]}>
                <TouchableOpacity>
                    <Image style={glancePostStyles.icon} source={heartIcon} />
                </TouchableOpacity>
            </View>
            <View style={[glancePostStyles.largeButtonContainer, { right: 12 }]}>
                <TouchableOpacity>
                    <Image style={glancePostStyles.icon} source={shareIcon} />
                </TouchableOpacity>
            </View>
            <View style={glancePostStyles.progressBarContainer}>
                <Animated.View
                    style={[
                        glancePostStyles.progressBar,
                        {
                            transform: [
                                {
                                    translateX: myCustomAnimatedValue.interpolate({
                                        inputRange: [0, (width + 6) * (data.length - 1)],
                                        outputRange: [-width, 0],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View> */}
        </View >
    );
}