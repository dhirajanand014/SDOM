import React, { useState, useRef } from 'react'
import { View, TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import Animated from 'react-native-reanimated';
import { togglePostSearchBox } from '../helper/SDOMHelper'
import { stringConstants } from '../constants/sdomConstants';
import { glancePostStyles } from '../styles/sdomStyles'

const post_search_input_close = require('../assets/post_search_input_close_icon.png');

export function SDOMPostSearch(props) {
    const { sdomDatastate, screenWidth, screenHeight, inputBoxTranslateX, contentTranslateY,
        contentOpacity, inputTextRef, viewPagerRef } = props;

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
                <TextInput ref={inputTextRef} placeholder="Search Posts" clearButtonMode="always"
                    textAlignVertical="center" value={searchValue} focusable={true}
                    onChangeText={(value) => setSearchValue(value)} style={glancePostStyles.search_input_text}>
                </TextInput>
                <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(inputBoxTranslateX,
                    contentTranslateY, contentOpacity, screenWidth, screenHeight, false, inputTextRef, setSearchValue)}>
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
                        <View style={glancePostStyles.search_content_view}>
                            <View style={glancePostStyles.search_content_separator}>
                                <ScrollView bounces="true" decelerationRate="fast" scrollEnabled={true}
                                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                    {
                                        searchValue !== undefined && posts && posts.filter((postFilter) => postFilter.postTitle.includes(searchValue)).
                                            map((post, index) => {
                                                const postIndex = posts.indexOf(post) + 1;
                                                return (
                                                    <TouchableOpacity key={`0_${post.postId}`} style={glancePostStyles.search_content_post_selection}
                                                        onPress={() => {
                                                            viewPagerRef.current.setPageWithoutAnimation(index);
                                                            togglePostSearchBox(inputBoxTranslateX,
                                                                contentTranslateY, contentOpacity, screenWidth, screenHeight, false, inputTextRef, setSearchValue);
                                                        }}>
                                                        <Text style={glancePostStyles.search_content_post_index}>{postIndex}</Text>
                                                        <Text style={glancePostStyles.search_content_post_title}>{` - ${post.postTitle}`}</Text>
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