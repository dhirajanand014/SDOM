import React, { useState } from 'react'
import { TextInput, Image, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated';
import { togglePostSearchBox } from '../helper/SDOMHelper'
import { stringConstants } from '../constants/sdomConstants';
import { glancePostStyles } from '../styles/sdomStyles'
import { SDOMPostSearchContent } from './SDOMPostSearchContent';

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
                    placeholderTextColor={"#3d3d3d"}
                    textAlignVertical="center" value={searchValue} focusable={true}
                    onChangeText={(value) => setSearchValue(value)} style={glancePostStyles.search_input_text}>
                </TextInput>
                <TouchableOpacity style={glancePostStyles.close_button_search_input} onPress={() => togglePostSearchBox(inputBoxTranslateX, contentTranslateY,
                    contentOpacity, screenWidth, screenHeight, false, inputTextRef, viewPagerRef, setSearchValue)}>
                    <Image style={glancePostStyles.search_input_close_input_icon} source={post_search_input_close} />
                </TouchableOpacity>
            </Animated.View>
            <SDOMPostSearchContent screenWidth={screenWidth} contentOpacity={contentOpacity} contentTranslateY={contentTranslateY}
                searchValue={searchValue} posts={posts} inputBoxTranslateX={inputBoxTranslateX} screenHeight={screenHeight}
                inputTextRef={inputTextRef} viewPagerRef={viewPagerRef} setSearchValue={setSearchValue} />
        </React.Fragment>
    )
}