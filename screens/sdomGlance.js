
import React, { useState, useEffect } from 'react';

import {
    Animated,
    StyleSheet,
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
    const { width, height } = Dimensions.get("window");
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
                                    <View style={styles.innerContainer} colors={['transparent', 'black']}>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleName}>
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={styles.descriptionContainer}>
                                            <Text style={styles.descriptionText}>
                                                {item.description}
                                            </Text>
                                        </View>
                                        <View style={styles.smallButtonsContainer}>
                                            <View style={styles.bottomIconsContainer}>
                                                <View style={[styles.buttonWithTextContainer]}>
                                                    <View
                                                        style={[
                                                            styles.smallButtonContainer,
                                                            styles.smallButtonWithTextIconContainer,
                                                        ]} >
                                                        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                                            <Text style={{ color: 'white' }}>
                                                                Read more
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <Image style={styles.icon} source={smallEllipsesIcon} />
                                        </View>
                                    </View>
                                } />
                        )
                    })
                }
            </ParallaxSwiper>

            <View style={[styles.largeButtonContainer, { right: 64 }]}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={heartIcon} />
                </TouchableOpacity>
            </View>
            <View style={[styles.largeButtonContainer, { right: 12 }]}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={shareIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.progressBarContainer}>
                <Animated.View
                    style={[
                        styles.progressBar,
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
const styles = StyleSheet.create({
    foregroundTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    foregroundText: {
        fontSize: 34,
        fontWeight: "700",
        letterSpacing: 0.41,
        color: "white"
    },
    gradient: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginBottom: 14,
    },
    titleName: {
        marginRight: 4,
        fontSize: 24,
        fontWeight: '700',
        display: 'flex',
        color: 'white',
    },
    titleText: {
        fontSize: 16,
        color: 'white',
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 16,
        color: 'white',
    },
    buttonWithTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    bottomIconsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        tintColor: 'white',
    },
    linkButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.5)',
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    smallButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        height: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    smallButtonWithTextIconContainer: {
        marginRight: 12,
    },
    largeButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 12,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressBar: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    }
});