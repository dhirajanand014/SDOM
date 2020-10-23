import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntro from 'rn-falcon-app-intro';
import { View, Text } from 'react-native';
import { introStyles } from '../styles/sdomStyles';
export const SDOMIntro = () => {

    const navigation = useNavigation();

    const doneBtnHandle = () => {
        navigation.navigate('Category');
    }

    return (
        <AppIntro onSkipBtnClick={doneBtnHandle} onDoneBtnClick={doneBtnHandle} >
            <View style={[introStyles.slide, { backgroundColor: '#fa931d' }]}>
                <View level={10}><Text style={introStyles.text}>Page 1</Text></View>
                <View level={15}><Text style={introStyles.text}>Page 1</Text></View>
                <View level={8}><Text style={introStyles.text}>Page 1</Text></View>
            </View>
            <View style={[introStyles.slide, { backgroundColor: '#a4b602' }]}>
                <View level={-10}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={5}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={20}><Text style={introStyles.text}>Page 2</Text></View>
            </View>
            <View style={[introStyles.slide, { backgroundColor: '#fa931d' }]}>
                <View level={-10}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={5}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={20}><Text style={introStyles.text}>Page 2</Text></View>
            </View>
            <View style={[introStyles.slide, { backgroundColor: '#a4b602' }]}>
                <View level={-10}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={5}><Text style={introStyles.text}>Page 2</Text></View>
                <View level={20}><Text style={introStyles.text}>Page 2</Text></View>
            </View>
        </AppIntro>
    )
}