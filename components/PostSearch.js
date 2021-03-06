import React, { useRef, useState } from 'react'
import { TextInput, Image, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, useDerivedValue } from 'react-native-reanimated';
import { togglePostSearchBox } from '../helper/Helper'
import { stringConstants } from '../constants/Constants';
import { glancePostStyles } from '../styles/Styles'
import { PostSearchContent } from './PostSearchContent';

const post_search_input_close = require('../assets/post_search_input_close_icon.png');
const post_search = require('../assets/post_search_icon.png');

export function PostSearch(props) {

    const { sdomDatastate, screenWidth, screenHeight, post, viewPagerRef, postDetailsRef } = props;
    const { posts } = sdomDatastate;
    const [searchValues, setSearchValues] = useState({
        searchText: stringConstants.EMPTY,
        searchForPostId: stringConstants.EMPTY
    });

    const inputTextRef = useRef(null);

    const input_search_box_translate_x_shared = useSharedValue(screenWidth);
    const content_translate_y_shared = useSharedValue(screenHeight);
    const content_opacity_shared = useSharedValue(0);

    const input_search_box_translate_x = useDerivedValue(() => {
        return input_search_box_translate_x_shared.value * 100;
    })

    const content_translate_y = useDerivedValue(() => {
        return content_translate_y_shared.value * 100;
    })

    const content_opacity = useDerivedValue(() => {
        return content_opacity_shared.value * 100;
    })

    const translateSearchInputBox = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: input_search_box_translate_x.value
            }]
        }
    })
    return (
        <View>
            <View style={glancePostStyles.glanceTopIcons}>
                <TouchableOpacity onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                    input_search_box_translate_x, content_translate_y, content_opacity, screenWidth, screenHeight,
                    true, inputTextRef, viewPagerRef)}>
                    <Image style={glancePostStyles.icon_post_search} source={post_search} />
                </TouchableOpacity>
            </View>
            <React.Fragment>
                <Animated.View style={[glancePostStyles.searchInputBox, translateSearchInputBox, { width: screenWidth - 80 }]}>
                    <TextInput ref={inputTextRef} placeholder="Search Posts" clearButtonMode="always"
                        placeholderTextColor={"#3d3d3d"} textAlignVertical="center" value={searchValues.searchText}
                        onChangeText={(value) => setSearchValues({
                            ...searchValues,
                            searchText: value
                        })} style={glancePostStyles.search_input_text}>
                    </TextInput>
                    <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                        input_search_box_translate_x, content_translate_y, content_opacity, screenWidth, screenWidth, false, inputTextRef, viewPagerRef)}>
                        <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                    </TouchableOpacity>
                </Animated.View>
                <PostSearchContent postItem={post} screenWidth={screenWidth} searchValues={searchValues}
                    contentOpacity={content_opacity} contentTranslateY={content_translate_y} setSearchValues={setSearchValues}
                    searchValues={searchValues} posts={posts} inputBoxTranslateX={input_search_box_translate_x} screenHeight={screenHeight}
                    inputTextRef={inputTextRef} viewPagerRef={viewPagerRef} postDetailsRef={postDetailsRef} />
            </React.Fragment>
        </View>
    )
}