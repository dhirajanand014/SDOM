import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { View, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import Animated from 'react-native-reanimated';
import { stringConstants } from '../constants/sdomConstants';
import { glancePostStyles } from '../styles/sdomStyles'

const post_search_input_close = require('../assets/post_search_input_close_icon.png');

export function SDOMPostSearch(props) {
    const { sdomDatastate, screenWidth, screenHeight, inputBoxTranslateX, contentTranslateY, contentOpacity } = props;

    const { posts } = sdomDatastate;
    const [searchValue, setSearchValue] = useState(stringConstants.EMPTY);
    return (
        <React.Fragment>
            <Animated.View style={[glancePostStyles.searchInputBox, {
                width: screenWidth - 80,
                transform: [{
                    translateX: inputBoxTranslateX
                }]
            }]}>
                <TextInput placeholder="Search Posts" clearButtonMode="always"
                    textAlignVertical="center" value={searchValue}
                    onChangeText={(value) => setSearchValue(value)} style={glancePostStyles.search_input_text}>
                </TextInput>
                <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => setText('')}>
                    <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                </TouchableOpacity>
            </Animated.View>
            {
                searchValue !== undefined &&
                <Animated.View style={[glancePostStyles.search_content, {
                    opacity: contentOpacity,
                    transform: [{
                        translateY: contentTranslateY
                    }]
                }]}>
                    <View style={glancePostStyles.search_content}>
                        <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 16 }}>
                            <View style={{ flex: 1, paddingTop: 2 }}>
                                <ScrollView bounces="true" decelerationRate="fast" scrollEnabled={true}
                                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                    {
                                        searchValue !== undefined && posts && posts.filter((postFilter) => postFilter.postTitle.includes(searchValue)).map((post, index) => {
                                            return (
                                                <TouchableOpacity style={{ flexDirection: 'row', height: 35, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e6e4eb', borderBottomStartRadius: 16, borderBottomEndRadius: 16 }}>
                                                    <Text style={{ fontFamily: 'sdom_roman_font', marginLeft: 16 }}>{`${index} - ${post.postTitle}`}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            }
        </React.Fragment >
    )
}