
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, Dimensions, StatusBar, Modal } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { postCountTypes, stringConstants } from '../constants/sdomConstants';
import {
    fetchPostsAndSaveToState, postWallPaperAlert, increaseAndSetPostCounts,
    downloadImageFromURL, resetOptionsState, setOptionsStateForDescription
} from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';

const post_like = require('../assets/post_likes_heart_arrow_icon.png');
const post_like_selected = require('../assets/post_likes_heart_arrow_icon_selected.png');
const post_external_link = require('../assets/post_external_link_icon.png')
const post_description = require('../assets/post_description_icon.png');
const post_wallpaper = require('../assets/post_set_wallpaper_icon.png');
const category_selection = require('../assets/category_selection_icon.png');
const post_download = require('../assets/post_download_icon.png');
const post_search = require('../assets/post_search_icon.png');
const post_report_abuse = require('../assets/post_report_abuse_icon.png');

export function sdomGlance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);
    const [optionsState, setOptionsState] = useState({
        descriptionModal: false,
        descriptionText: stringConstants.EMPTY,
    })

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    console.log(sdomDatastate)
    return (
        <View>
            <TouchableOpacity style={glancePostStyles.category_selection}
                onPress={() => navigation.navigate("Category")}>
                <Image source={category_selection} style={glancePostStyles.category_selection_image} />
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
                                    <View style={glancePostStyles.innerContainer}>
                                        <View style={glancePostStyles.smallButtonsContainer}>
                                            <Text style={glancePostStyles.titleName}>{item.postTitle}</Text>
                                            <TouchableOpacity style={{ width: 35 }} onPress={() => Linking.openURL(item.postLink)}>
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
                                    <View style={glancePostStyles.glanceTopIcons}>
                                        <TouchableOpacity>
                                            <Image style={glancePostStyles.icon_post_search} source={post_search} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View key={`3_${index}_${item.categoryId}`} style={glancePostStyles.largeButtonContainer}>
                                    <View style={glancePostStyles.glanceTopIconInfo}>
                                        <TouchableOpacity style={glancePostStyles.backgroundIconSpacing} onPress={() =>
                                            setOptionsStateForDescription(optionsState, setOptionsState, item.postDescription)}>
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
                    })}
                <Modal animationType="fade" transparent={true} visible={optionsState.descriptionModal}
                    presentationStyle="fullScreen" onRequestClose={() => resetOptionsState(optionsState, setOptionsState)}>
                    <View style={glancePostStyles.modalContainer}>
                        <View style={glancePostStyles.modalView}>
                            <ScrollView persistentScrollbar={true} bounces={true}>
                                <Text style={glancePostStyles.descriptionText}>{optionsState.descriptionText}</Text>
                            </ScrollView>
                            <TouchableOpacity style={glancePostStyles.postReportAbuse}>
                                <Image style={glancePostStyles.icon_post_report_abuse} source={post_report_abuse} />
                            </TouchableOpacity>
                            <TouchableOpacity style={glancePostStyles.postDescriptionModalButton}
                                onPress={() => resetOptionsState(optionsState, setOptionsState)} >
                                <Text style={glancePostStyles.modalHideText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ViewPager>
        </View >
    );
}