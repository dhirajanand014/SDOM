import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntro from 'rn-falcon-app-intro';
import { View, Dimensions, Image } from 'react-native';
import { introStyles } from '../styles/sdomStyles';
import { colorConstants } from '../constants/sdomConstants';
export const SDOMIntro = () => {

    const navigation = useNavigation();

    const doneBtnHandle = () => {
        navigation.navigate('Category', { fromIntro: true });
    }

    const { width, height } = Dimensions.get("window");

    const wallpiper_intro_1 = require(`../assets/intro/wallpiper_intro_page_1.jpg`);
    const wallpiper_intro_2 = require(`../assets/intro/wallpiper_intro_page_2.jpg`);
    const wallpiper_intro_3 = require(`../assets/intro/wallpiper_intro_page_3.jpg`);
    const wallpiper_intro_4 = require(`../assets/intro/wallpiper_intro_page_4.jpg`);
    const wallpiper_intro_5 = require(`../assets/intro/wallpiper_intro_page_5.jpg`);
    const wallpiper_intro_6 = require(`../assets/intro/wallpiper_intro_page_6.jpg`);

    return (
        <AppIntro onSkipBtnClick={doneBtnHandle} onDoneBtnClick={doneBtnHandle} activeDotColor={colorConstants.YELLOW}>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_1} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_2} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_3} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_4} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_5} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <Image source={wallpiper_intro_6} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
        </AppIntro>
    )
}