import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntro from 'rn-falcon-app-intro';
import { View, Dimensions, Image } from 'react-native';
import { introStyles } from '../styles/sdomStyles';
import { colorConstants } from '../constants/sdomConstants';
import FastImage from 'react-native-fast-image';
export const SDOMIntro = () => {

    const navigation = useNavigation();

    const doneBtnHandle = () => {
        navigation.navigate('Category', { fromIntro: true });
    }

    const { width, height } = Dimensions.get("window");

    const preLoadIntroImages = [require(`../assets/intro/wallpiper_intro_page_1.jpg`),
    require(`../assets/intro/wallpiper_intro_page_2.jpg`), require(`../assets/intro/wallpiper_intro_page_3.jpg`),
    require(`../assets/intro/wallpiper_intro_page_4.jpg`), require(`../assets/intro/wallpiper_intro_page_5.jpg`),
    require(`../assets/intro/wallpiper_intro_page_6.jpg`)];

    const uris = preLoadIntroImages.map(image => ({
        uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    return (
        <AppIntro onSkipBtnClick={doneBtnHandle} onDoneBtnClick={doneBtnHandle} activeDotColor={colorConstants.YELLOW}>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_1.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_2.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_3.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_4.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={20} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_5.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
            <View level={15} style={[introStyles.slide, { width: width, height: height }]}>
                <FastImage source={{
                    uri: Image.resolveAssetSource(require(`../assets/intro/wallpiper_intro_page_6.jpg`)).uri,
                    priority: FastImage.priority.normal
                }} style={{ width: width, height: height }} resizeMode={'stretch'} />
            </View>
        </AppIntro>
    )
}