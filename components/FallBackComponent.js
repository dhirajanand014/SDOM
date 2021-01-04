import React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { componentErrorConsts } from '../constants/Constants';
import { errorBoundaryStyles } from "../styles/Styles";
import RNRestart from 'react-native-restart';

export const FallBackComponent = (props) => {

    const { width, height, descriptionText, componentErrorConst, navigation } = props;

    const error_icon = require(`../assets/error_warning_icon.png`);

    return (
        <View style={errorBoundaryStyles.container}>
            <View style={[{ width: width, height: height }, errorBoundaryStyles.content]}>
                <View>
                    <Image style={errorBoundaryStyles.infoIconStyle} source={error_icon} />
                    <Text style={errorBoundaryStyles.textMessage1Style}>Oops, Something Went Wrong</Text>
                    <Text style={errorBoundaryStyles.textMessage2Style}>{descriptionText}</Text>
                </View>
                {
                    componentErrorConsts.ERROR_BOUNDARY == componentErrorConst &&
                    <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetToCategorySelectionButton} onPress={() => RNRestart.Restart()}>
                        <Text style={errorBoundaryStyles.redirectButtonText}>Reload Application</Text>
                    </TouchableOpacity>
                }
                {
                    componentErrorConsts.CATEGORY_WITHOUT_POST == componentErrorConst &&
                    <TouchableOpacity activeOpacity={.7} style={errorBoundaryStyles.resetToCategorySelectionButton}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: "Category" }],
                        })}>
                        <Text style={errorBoundaryStyles.redirectButtonText}>Select other categories</Text>
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}