import { StyleSheet } from 'react-native'

export const glancePostStyles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        position: 'absolute',
        paddingLeft: 15,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    titleName: {
        fontSize: 18,
        fontFamily: 'sdom_roman_font',
        display: 'flex',
        color: 'white',
    },
    backgroundRoundColor: {
        paddingRight: 1,
        paddingTop: 3,
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    postProfileName: {
        marginRight: 4,
        justifyContent: 'center',
        fontSize: 9,
        fontFamily: 'sdom_bold_font',
        display: 'flex',
        color: 'white',
    },
    postCategoriesIn: {
        fontSize: 9,
        justifyContent: 'center',
        fontFamily: 'sdom_roman_font',
        display: 'flex',
        color: 'white',
    },
    descriptionText: {
        fontSize: 14,
        textAlign: 'auto',
        color: 'black',
    },
    descriptionTextNACenter: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
    },
    category_selection: {
        alignItems: "flex-end",
        position: "absolute",
        zIndex: 100,
        top: 10,
        left: 5,
        padding: 10
    },
    category_selection_image: {
        width: 25,
        height: 25
    },
    icon_post_like: {
        borderColor: 'red',
        width: 26,
        height: 26
    },
    icon_post_search: {
        width: 22,
        height: 22
    },
    searchInputBox: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        right: -20,
    },
    close_button_search_input: {
        justifyContent: 'center',
        backgroundColor: '#e4e6eb',
        alignItems: 'center',
        flexDirection: 'row',
        right: 30,
    },
    search_input_close_input_icon: {
        width: 20,
        height: 20
    },
    search_content: {
        height: 280,
        position: 'absolute',
        width: 500,
        top: 25,
        right: 0,
        zIndex: 999,
        elevation: 4
    },
    search_content_view: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16
    },
    search_content_post_selection: {
        flexDirection: 'row',
        paddingVertical: 18,
        paddingRight: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16
    },
    search_content_post_title: {
        fontFamily: 'sdom_roman_font'
    },
    search_content_post_index: {
        fontFamily: 'sdom_bold_font',
        marginLeft: 16
    },
    search_content_activity_indicator: {
        alignItems: 'center',
        paddingTop: 120,
        justifyContent: 'center'
    },
    search_input_text: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 20,
        paddingHorizontal: 20,
        fontFamily: 'sdom_roman_font',
        fontSize: 15
    },
    icon_post_description: {
        width: 25,
        height: 25
    },
    icon_post_wallpaper: {
        width: 25,
        height: 25
    },
    icon_post_download: {
        width: 25,
        height: 25
    },
    icon_external_link: {
        width: 23,
        height: 23
    },
    icon_post_report_abuse: {
        width: 22,
        height: 22
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    postTitleAndProfileStyle: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 10
    },
    searchIconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        width: 32,
        right: 50,
        height: 32
    },
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 45
    },
    modalView: {
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        top: 30,
        maxHeight: 250,
        width: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    radioButtonModalView: {
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        maxHeight: 700,
        width: 300,
        display: 'flex',
        top: 30,
        flexDirection: 'column',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalHideText: {
        color: "white",
        fontFamily: 'sdom_roman_font',
        textAlign: "center",
        fontSize: 15
    },
    reportAbuseCancelText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        fontFamily: 'sdom_roman_font'
    },
    reportAbuseModalHeader: {
        alignItems: 'center'
    },
    reportAbuseModalTitle: {
        fontFamily: 'sdom_bold_font',
        fontSize: 20,
        padding: 10
    },
    reportAbuseModalTitleDivider: {
        width: 230,
        height: 1,
        backgroundColor: "lightgray"
    },
    icon_count_text: {
        color: "white",
        fontFamily: 'sdom_roman_font',
        textAlign: "center",
        fontSize: 10,
        top: 1
    },
    shimmerViewInit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    closeReportAbuseModal: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginHorizontal: 12,
        marginVertical: 10,
        elevation: 3,
    },
    icon_modal_close: {
        height: 22,
        width: 22
    },
    glanceTopIcons: {
        paddingTop: 4,
        paddingLeft: 2,
        paddingBottom: 1,
        paddingRight: 2
    },
    postDescriptionModalButton: {
        top: 0,
        right: 0,
        marginHorizontal: 12,
        marginVertical: 10,
        elevation: 3,
    },
    reportAbuseSubmitButton: {
        borderRadius: 18,
        marginTop: 15,
        padding: 8,
        alignSelf: 'flex-end',
        elevation: 3,
        backgroundColor: "#fcc200"
    },
    reportAbuseSubmitButtonDisabled: {
        opacity: .4,
        borderRadius: 18,
        marginTop: 15,
        padding: 8,
        alignSelf: 'flex-end',
        elevation: 3,
        backgroundColor: "#fcc200"
    },
    postReportAbuse: {
        left: 12,
        marginTop: 10,
        elevation: 3,
    },
    cancelReportAbuse: {
        position: 'absolute',
        right: 100,
        bottom: 25,
        marginTop: 15,
        elevation: 3,
    },
    reportAbuseModalContainer: {
        marginBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reportAbuseRadioText: {
        marginRight: 35,
        fontSize: 14,
        fontFamily: 'sdom_roman_font'
    },
    reportAbusesFetchLoading: {
        alignItems: 'center',
        marginBottom: 25,
        justifyContent: 'center',
        padding: 8
    },
    reportAbuseRadioCircle: {
        height: 20,
        width: 20,
        padding: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reportAbuseAlreadySelected: {
        alignItems: 'center',
        marginBottom: 25,
        justifyContent: 'center',
        padding: 8,
        fontFamily: 'sdom_bold_font'
    },
    reportAbuseSelectedRb: {
        width: 10,
        height: 10,
        borderRadius: 40,
        backgroundColor: 'black',
    },
    tourGuideStyle: {
        width: 120,
        height: 130
    }
});

export const categoryViewStyles = StyleSheet.create({
    categoryView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#3d3d3d'
    },
    saveButtonContainer: {
        marginVertical: 10,
        height: 45,
        width: 140,
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 100,
        marginHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: "#fcc200",
        borderColor: '#e3ddda',
        alignItems: 'center',
        elevation: 3,
        borderRadius: 30
    },
    bottomButtonLayout: {
        height: 63,
        backgroundColor: '#3d3d3d'
    },
    textSave: {
        color: "#000000",
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'sdom_bold_font',
    },
    skipTourZoneStyle: {
        width: 95,
        paddingVertical: 18
    }
})

export const flatListItemStyles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1 / 3,
        justifyContent: 'space-between',
    },
    checkBoxSelected: {
        width: '100%',
        height: '100%',
        borderColor: '#fcc200',
        borderWidth: 3,
        overflow: 'hidden',
        shadowColor: '#fcc200',
        shadowRadius: 18,
        borderRadius: 8,
        shadowOpacity: .7,
        overflow: 'hidden'
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    cardSurface: {
        height: 122,
        width: 122,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        right: 100,
        marginVertical: 5,
        borderRadius: 8,
    },
    textsView: {
        flex: 1,
        flexDirection: 'column',
        top: 2,
        paddingTop: 2,
        left: 4
    },
    textCategoryTitle: {
        fontFamily: 'sdom_bold_font',
        color: "#ffffff",
        fontSize: 14,
        justifyContent: 'center',
        alignItems: "center"
    },
    textCategoryCity: {
        fontFamily: 'sdom_roman_font',
        color: "#ffffff",
        padding: 1,
        fontSize: 12,
        justifyContent: 'center',
        alignItems: "center"
    }
});

export const headerStyles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
    }
});

export const introStyles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});