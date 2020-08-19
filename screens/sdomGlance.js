
import React, { useState, useEffect } from 'react';

import {
    Animated,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions
} from 'react-native';
import {
    ParallaxSwiper,
    ParallaxSwiperPage
} from "react-native-parallax-swiper";
import { fetchData } from '../helper/SDOMHelper';
import data from '../data/data.json'
import { glancePostStyles } from '../styles/sdomStyles';


const smallRetweetIcon = require('../assets/retweet.png');
const smallHeartIcon = require('../assets/heart-small.png');
const smallEllipsesIcon = require('../assets/ellipses.png');
const xIcon = require('../assets/x.png');
const heartIcon = require('../assets/heart-big.png');
const shareIcon = require('../assets/share.png');

export function sdomGlance({ navigation }) {
    const [SDOMdatastate, setSDOMdatastate] = useState([]);
    useEffect(() => {
        try {
            const data = fetchData();
            setSDOMdatastate({ data });
        } catch (error) {
            console.log(error);
        }

    }, []);
    const { width, height } = Dimensions.get("screen");
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
    console.log(data)
    return (
        <View>
            <ParallaxSwiper
                speed={0.75}
                animatedValue={myCustomAnimatedValue}
                dividerWidth={6}
                vertical={true}
                dividerColor="black"
                onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
                progressBarBackgroundColor="rgba(0,0,0,0.25)"
                progressBarValueBackgroundColor="white">
                {
                    SDOMdatastate.data && SDOMdatastate.data.map((item, index) => {
                        return (
                            <ParallaxSwiperPage key={item.id}
                                BackgroundComponent={
                                    <Image source={{ uri: item.link }}
                                        style={{ width: width, height: height }} />
                                }
                                ForegroundComponent={
                                    <View style={glancePostStyles.innerContainer} colors={['transparent', 'black']}>
                                        <View style={glancePostStyles.titleContainer}>
                                            <Text style={glancePostStyles.titleName}>
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={glancePostStyles.descriptionContainer}>
                                            <Text style={glancePostStyles.descriptionText}>
                                                {item.description}
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
                                                        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
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
            </View>
        </View >
    );
}