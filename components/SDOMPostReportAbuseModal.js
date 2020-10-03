import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import { modalTextConstants, reportAbuseRequestPayloadKeys } from '../constants/sdomConstants';
import { resetOptionsStateReportAbuse, setReportAbuseSelectedOption, setReportIdForPost, fetchReportAbuseValues } from '../helper/SDOMHelper';
import { glancePostStyles } from '../styles/sdomStyles';

export const SDOMPostReportAbuseModal = (props) => {
    const { optionsState, setOptionsState } = props;
    const { reportAbuses, selectedReportAbuse } = optionsState;
    return (
        <Modal animationType="fade" transparent={true} visible={optionsState.reportAbuseModal}
            onRequestClose={() => resetOptionsStateReportAbuse(optionsState, setOptionsState)}
            onShow={async () => await fetchReportAbuseValues(optionsState, setOptionsState)}>
            <View style={glancePostStyles.modalContainer}>
                <View style={glancePostStyles.radioButtonModalView}>
                    <View style={glancePostStyles.reportAbuseModalHeader}>
                        <Text style={glancePostStyles.reportAbuseModalTitle}>{modalTextConstants.REPORT_ABUSE_TITLE}</Text>
                        <View style={glancePostStyles.reportAbuseModalTitleDivider}></View>
                    </View>
                    <ScrollView style={{ top: 25 }} persistentScrollbar={true} bounces={true}>
                        {
                            reportAbuses.length && reportAbuses.map((item, index) => {
                                return (
                                    <View key={`${item.reportId}_${index}`} style={glancePostStyles.reportAbuseModalContainer}>
                                        <Text style={glancePostStyles.reportAbuseRadioText}>{item.reportTitle}</Text>
                                        <TouchableOpacity
                                            style={glancePostStyles.reportAbuseRadioCircle} onPress={() =>
                                                setReportAbuseSelectedOption(optionsState, setOptionsState, item.reportId)
                                            }>
                                            {item.reportId == selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID] &&
                                                (!selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] &&
                                                    <View style={glancePostStyles.reportAbuseSelectedRb} /> || <Text>Selected</Text>)}
                                        </TouchableOpacity>
                                    </View>
                                )
                            }) || <ActivityIndicator hidesWhenStopped={reportAbuses.length}
                                style={glancePostStyles.reportAbusesFetchLoading} size="large" color="#3d3d3d" />
                        }
                    </ScrollView>
                    <TouchableOpacity style={glancePostStyles.cancelReportAbuse} onPress={() =>
                        resetOptionsStateReportAbuse(optionsState, setOptionsState)}>
                        <Text style={glancePostStyles.reportAbuseCancelText}>{modalTextConstants.CANCEL_BUTTON}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID]}
                        style={!selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID] && glancePostStyles.reportAbuseSubmitButtonDisabled ||
                            glancePostStyles.reportAbuseSubmitButton}
                        onPress={async () => setReportIdForPost(optionsState, setOptionsState)} >
                        <Text style={glancePostStyles.modalHideText}>{modalTextConstants.SUBMIT_BUTTON}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}