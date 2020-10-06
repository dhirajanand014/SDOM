import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import { togglePostSearchBox } from '../helper/SDOMHelper'
import { glancePostStyles } from '../styles/sdomStyles'

export function SDOMPostSearchContent(props) {
    const { screenWidth, contentOpacity, contentTranslateY, searchValue, posts, inputBoxTranslateX, screenHeight,
        inputTextRef, viewPagerRef, setSearchValue } = props;

    return (
        searchValue !== undefined &&
        <Animated.View style={[glancePostStyles.search_content, {
            opacity: contentOpacity,
            transform: [{
                translateY: contentTranslateY
            }]
        }]}>
            <View style={[glancePostStyles.search_content, {
                width: screenWidth - 100
            }]}>
                <View style={glancePostStyles.search_content_view}>
                    <ScrollView keyboardShouldPersistTaps='always' bounces={true} decelerationRate="fast" scrollEnabled={true} alwaysBounceVertical={true}
                        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        {
                            searchValue !== undefined && posts && posts.filter((postFilter) => postFilter.postTitle.includes(searchValue)).
                                map((post) => {
                                    const postIndex = posts.indexOf(post);
                                    return (
                                        <TouchableOpacity key={`0_${post.postId}`} style={glancePostStyles.search_content_post_selection}
                                            onPress={() => {
                                                viewPagerRef.current.setPageWithoutAnimation(postIndex);
                                                togglePostSearchBox(inputBoxTranslateX, contentTranslateY, contentOpacity, screenWidth,
                                                    screenHeight, false, inputTextRef, viewPagerRef, setSearchValue);
                                            }}>
                                            <Text style={glancePostStyles.search_content_post_index}>{postIndex + 1}</Text>
                                            <Text style={glancePostStyles.search_content_post_title}>{` - ${post.postTitle}`}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                        }
                    </ScrollView>
                </View>
            </View>
        </Animated.View>
    )
}