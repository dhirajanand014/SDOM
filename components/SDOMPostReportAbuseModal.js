import React from 'react';
import { Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import { modalTextConstants, reportAbuseOptions } from '../constants/sdomConstants';
import { resetOptionsStateReportAbuse, setReportAbuseSelectedOption, sendEmailToSupportGroup } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';

export const SDOMPostReportAbuseModal = (props) => {
    const { optionsState, setOptionsState } = props;
    return (
        <Modal animationType="fade" transparent={true} visible={optionsState.reportAbuseModal}
            onRequestClose={() => resetOptionsStateReportAbuse(optionsState, setOptionsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.radioButtonModalView}>
                    <View style={glancePostStyles.reportAbuseModalHeader}>
                        <Text style={glancePostStyles.reportAbuseModalTitle}>{modalTextConstants.REPORT_ABUSE_TITLE}</Text>
                        <View style={glancePostStyles.reportAbuseModalTitleDivider}></View>
                    </View>
                    <ScrollView style={{ top: 25 }} persistentScrollbar={true} bounces={true}>
                        {
                            reportAbuseOptions.map((item, index) => {
                                return (
                                    <View key={index} style={glancePostStyles.reportAbuseModalContainer}>
                                        <Text style={glancePostStyles.reportAbuseRadioText}>{item}</Text>
                                        <TouchableOpacity
                                            style={glancePostStyles.reportAbuseRadioCircle} onPress={() =>
                                                setReportAbuseSelectedOption(optionsState, setOptionsState, item)
                                            }>
                                            {item == optionsState.selectedReportAbuse && <View style={glancePostStyles.reportAbuseSelectedRb} />}
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity style={glancePostStyles.cancelReportAbuse} onPress={() =>
                        resetOptionsStateReportAbuse(optionsState, setOptionsState)}>
                        <Text style={glancePostStyles.reportAbuseCancelText}>{modalTextConstants.CANCEL_BUTTON}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!optionsState.selectedReportAbuse} style={!optionsState.selectedReportAbuse &&
                        glancePostStyles.reportAbuseSubmitButtonDisabled || glancePostStyles.reportAbuseSubmitButton}
                        onPress={() => sendEmailToSupportGroup(optionsState, setOptionsState)} >
                        <Text style={glancePostStyles.modalHideText}>{modalTextConstants.SUBMIT_BUTTON}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}