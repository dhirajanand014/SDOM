
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, Dimensions, StatusBar, Modal, Alert } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { fetchPostsAndSaveToState, setCurrentImageAsWallPaper } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';

const post_like = require('../assets/post_likes_heart_arrow_icon.png');
const post_external_link = require('../assets/post_external_link_icon.png')
const post_description = require('../assets/post_description_icon.png');
const post_wallpaper = require('../assets/post_set_wallpaper_icon.png');
const category_selection = require('../assets/category_selection_icon.png');
const post_download = require('../assets/post_download_icon.png');
const post_search = require('../assets/post_search_icon.png');

export function sdomGlance({ navigation }) {

    const [sdomDatastate, setSdomDatastate] = useState([]);
    const [optionsState, setOptionsState] = useState({
        descriptionModal: false,
        descriptionText: "",
        postLikesCount: 0,
        postDownloadsCount: 0,
        postWallPapersSetCount: 0
    })

    useEffect(() => {
        fetchPostsAndSaveToState(sdomDatastate, setSdomDatastate);
    }, []);

    let { width, height } = Dimensions.get("window");
    height += StatusBar.currentHeight;

    console.log(sdomDatastate)
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ alignItems: "flex-end", position: "absolute", zIndex: 100, top: 50, left: 10, padding: 10 }}
                onPress={() => navigation.navigate("Category")}>
                <Image source={category_selection} style={{ width: 25, height: 25 }} />
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
                                            <TouchableOpacity onPress={() => Linking.openURL(item.postLink)}>
                                                <Image style={glancePostStyles.icon_external_link} source={post_external_link} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={glancePostStyles.scrollViewDescription}>
                                            <ScrollView style={{ height: 80 }} showsHorizontalScrollIndicator={false} scrollEnabled
                                                persistentScrollbar bounces pagingEnabled >
                                                <Text style={glancePostStyles.descriptionText}>{item.postDescription}</Text>
                                            </ScrollView>
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
                                        <TouchableOpacity onPress={() => setOptionsState({
                                            ...optionsState,
                                            descriptionModal: true,
                                            descriptionText: item.postDescription
                                        })}>
                                            <Image style={glancePostStyles.icon_post_description} source={post_description} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={glancePostStyles.glanceTopIcons}>
                                        <TouchableOpacity>
                                            <Image style={glancePostStyles.icon_post_like} source={post_like} />
                                        </TouchableOpacity>
                                        <Text style={glancePostStyles.modalHideText}>{optionsState.postLikesCount}</Text>
                                    </View>
                                    <View style={glancePostStyles.glanceTopIcons}>
                                        <TouchableOpacity onPress={() => {
                                            Alert.alert(
                                                "Confirm",
                                                "Do you want to set the current image as wallpaper and lockscreen?",
                                                [
                                                    {
                                                        text: "Cancel", style: "cancel"
                                                    },
                                                    { text: "OK", onPress: async () => await setCurrentImageAsWallPaper(item.postImage, item.postTitle) }
                                                ],
                                                { cancelable: false }
                                            );
                                        }}>
                                            <Image style={glancePostStyles.icon_post_wallpaper} source={post_wallpaper} />
                                        </TouchableOpacity>
                                        <Text style={glancePostStyles.modalHideText}>{optionsState.postWallPapersSetCount}</Text>
                                    </View>
                                    <View style={glancePostStyles.glanceTopIcons}>
                                        <TouchableOpacity>
                                            <Image style={glancePostStyles.icon_post_download} source={post_download} />
                                        </TouchableOpacity>
                                        <Text style={glancePostStyles.modalHideText}>{optionsState.postDownloadsCount}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                <Modal animationType="fade" transparent={true} visible={optionsState.descriptionModal}
                    onRequestClose={() => {
                        setOptionsState({
                            ...optionsState,
                            descriptionModal: false,
                            descriptionText: '',
                        });
                    }}>
                    <View style={glancePostStyles.modalContainer}>
                        <View style={glancePostStyles.modalView}>
                            <ScrollView persistentScrollbar={true} bounces={true}>
                                <Text style={glancePostStyles.descriptionText}>{optionsState.descriptionText}</Text>
                            </ScrollView>
                            <TouchableOpacity style={{
                                ...glancePostStyles.modalButton,
                                backgroundColor: "#fcc200"
                            }}
                                onPress={() => {
                                    setOptionsState({
                                        ...optionsState,
                                        descriptionModal: false,
                                        descriptionText: '',
                                    });
                                }}>
                                <Text style={glancePostStyles.modalHideText}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ViewPager>
        </View >
    );
}