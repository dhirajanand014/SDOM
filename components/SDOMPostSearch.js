import React, { useState } from 'react'
import { TextInput, Image, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated';
import { togglePostSearchBox } from '../helper/SDOMHelper'
import { stringConstants } from '../constants/sdomConstants';
import { glancePostStyles } from '../styles/sdomStyles'
import { SDOMPostSearchContent } from './SDOMPostSearchContent';


const post_search_input_close = require('../assets/post_search_input_close_icon.png');
const post_search = require('../assets/post_search_icon.png');

export function SDOMPostSearch(props) {
    const { sdomDatastate, screenWidth, screenHeight, post, inputBoxTranslateX, contentTranslateY,
        contentOpacity, inputTextRef, viewPagerRef, input_search_box_translate_x, content_translate_y,
        content_opacity } = props;
    const { posts } = sdomDatastate;
    const [searchValues, setSearchValues] = useState({
        searchText: stringConstants.EMPTY,
        searchForPostId: stringConstants.EMPTY
    });
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
                <Animated.View style={[glancePostStyles.searchInputBox, {
                    width: screenWidth - 80,
                    transform: [{
                        translateX: inputBoxTranslateX
                    }]
                }]}>
                    <TextInput ref={inputTextRef} placeholder="Search Posts" clearButtonMode="always"
                        placeholderTextColor={"#3d3d3d"} textAlignVertical="center" value={searchValues.searchText}
                        onChangeText={(value) => setSearchValues({
                            ...searchValues,
                            searchText: value
                        })} style={glancePostStyles.search_input_text}>
                    </TextInput>
                    <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(searchValues, setSearchValues, post,
                        inputBoxTranslateX, contentTranslateY, contentOpacity, screenWidth, screenWidth, false, inputTextRef, viewPagerRef)}>
                        <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                    </TouchableOpacity>
                </Animated.View>
                <SDOMPostSearchContent postItem={post} screenWidth={screenWidth} searchValues={searchValues}
                    contentOpacity={contentOpacity} contentTranslateY={contentTranslateY} setSearchValues={setSearchValues}
                    searchValues={searchValues} posts={posts} inputBoxTranslateX={inputBoxTranslateX} screenHeight={screenHeight}
                    inputTextRef={inputTextRef} viewPagerRef={viewPagerRef} />
            </React.Fragment>
        </View>
    )
}