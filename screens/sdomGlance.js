
import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Image, TouchableOpacity, Linking, Dimensions, StatusBar } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { fetchPostsAndSaveToState, setCurrentImageAsWallPaper } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';
import FastImage from 'react-native-fast-image';
import { ImageBackground } from 'react-native';

const smallRetweetIcon = require('../assets/retweet.png');
const smallHeartIcon = require('../assets/heart-small.png');
const smallEllipsesIcon = require('../assets/ellipses.png');
const heartIcon = require('../assets/heart-big.png');
const categoryIcon = require('../assets/category_selection_icon.png');
const shareIcon = require('../assets/share.png');

export function sdomGlance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;
    const myCustomAnimatedValue = new Animated.Value(0);

    console.log(sdomDatastate)
    return (
        <View>
            <TouchableOpacity style={{ alignItems: "flex-end", position: "absolute", zIndex: 100, top: 50, left: 10, padding: 10 }}
                onPress={() => navigation.navigate("Category")}>
                <Image source={categoryIcon} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>

            <ViewPager style={{ width: width, height: height }} orientation={"vertical"} transitionStyle={"scroll"}
                initialPage={0}>
                {
                    sdomDatastate.posts && sdomDatastate.posts.map((item, index) => {
                        return (
                            <View>
                                <View key={`1_${index}_${item.categoryId}`}>
                                    <FastImage source={{
                                        uri: item.postImage,
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable
                                    }} style={{ width, height: height }} />
                                    <View style={glancePostStyles.innerContainer} colors={['transparent', 'black']}>
                                        <Text style={glancePostStyles.titleName}>
                                            {item.postTitle}
                                        </Text>
                                        <Text style={glancePostStyles.descriptionText}>
                                            {item.postDescription}
                                        </Text>
                                        <View style={glancePostStyles.smallButtonsContainer}>
                                            <View style={glancePostStyles.bottomIconsContainer}>
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
                                            <Image style={glancePostStyles.icon} source={smallEllipsesIcon} />
                                        </View>
                                    </View>
                                </View>

                                <View key={`2_${index}_${item.categoryId}`} style={[glancePostStyles.largeButtonContainer, { right: 64 }]}>
                                    <TouchableOpacity style={glancePostStyles.glanceTopIcons}>
                                        <Image style={glancePostStyles.icon} source={heartIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View key={`3_${index}_${item.categoryId}`} style={[glancePostStyles.largeButtonContainer, { right: 12 }]}>
                                    <TouchableOpacity style={glancePostStyles.glanceTopIcons} onPress={async () => {
                                        await setCurrentImageAsWallPaper(item.postImage, item.postTitle)
                                    }}>
                                        <Image style={glancePostStyles.icon} source={shareIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View key={`4_${index}_${item.categoryId}`} style={glancePostStyles.progressBarContainer}>
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
        </View >
    );
}