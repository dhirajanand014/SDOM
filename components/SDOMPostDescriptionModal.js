import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Modal, Image } from 'react-native';
import { modalTextConstants } from '../constants/sdomConstants';
import { resetOptionsState, setOptionsStateRadioOptions } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';

export const SDOMPostDescriptionModal = (props) => {
    const { optionsState, setOptionsState, reportAbuseIcon } = props;
    return (
        <Modal animationType="fade" transparent={true} visible={optionsState.descriptionModal}
            onRequestClose={() => resetOptionsState(optionsState, setOptionsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.modalView}>
                    <ScrollView persistentScrollbar={true} bounces={true}>
                        <Text style={glancePostStyles.descriptionText}>{optionsState.selectedPost && optionsState.selectedPost.postDescription
                            || `Not Available`}</Text>
                    </ScrollView>
                    <TouchableOpacity style={glancePostStyles.postReportAbuse} onPress={() =>
                        setOptionsStateRadioOptions(optionsState, setOptionsState)}>
                        <Image style={glancePostStyles.icon_post_report_abuse} source={reportAbuseIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={glancePostStyles.postDescriptionModalButton}
                        onPress={() => resetOptionsState(optionsState, setOptionsState)} >
                        <Text style={glancePostStyles.modalHideText}>{modalTextConstants.CLOSE_BUTTON}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}