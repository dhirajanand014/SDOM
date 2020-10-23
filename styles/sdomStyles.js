import { StyleSheet } from 'react-native'

export const glancePostStyles = StyleSheet.create({
    foregroundTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    foregroundText: {
        fontSize: 34,
        fontWeight: "700",
        letterSpacing: 0.41,
        color: "white"
    },
    gradient: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'flex-end',
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 100,
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginBottom: 40,
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
    backgroundIconSpacing: {
        paddingRight: 1,
        paddingTop: 3,
        alignItems: 'center'
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
    categoryTitleType: {
        marginRight: 4,
        fontSize: 18,
        fontFamily: 'sdom_roman_font',
        display: 'flex',
        color: 'white',
    },
    descriptionContainer: {
        marginBottom: 12,
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
    buttonWithTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    bottomIconsContainer: {
        flex: 1,
        flexDirection: 'row',
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
    search_content_separator: {
        flex: 1,
        paddingTop: 2
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
        width: 28,
        height: 28
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    postTitleAndProfileStyle: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 50
    },
    smallButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        height: 24,
    },
    smallButtonWithTextIconContainer: {
        marginRight: 12,
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
        height: 32,
    },
    largeButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 92,
        width: 32,
        right: 10,
        height: 32,
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
        fontSize: 10
    },
    shimmerViewInit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    modalButton: {
        borderRadius: 20,
        marginTop: 20,
        padding: 10,
        elevation: 2
    },
    glanceTopIconLike: {
        marginTop: 15,
        paddingTop: 4,
        paddingLeft: 2,
        paddingBottom: 1,
        paddingRight: 2
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
    glanceTopIconInfo: {
        padding: 1
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
    search_input_safe_area: {
        flex: 1,
        backgroundColor: 'white',
    },
    content_item_separator: {
        paddingTop: 50,
        marginTop: 5,
        height: 1,
        backgroundColor: '#e6e4eb'
    },
    search_items: {
        padding: 16,
        alignItems: 'center',
    }
});

export const categoryViewStyles = StyleSheet.create({
    container: {
        fontSize: 25,
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 70,
        marginBottom: 30,
        alignItems: "center"
    },
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
        borderRadius: 30,
        borderWidth: 3
    },
    bottomButtonLayout: {
        height: 63,
        backgroundColor: '#3d3d3d'
    },
    textSave: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'sdom_bold_font',
    }
})

export const flatListItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
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
    GridViewTextLayout: {
        fontSize: 20,
        position: 'absolute',
        bottom: 0,
        fontWeight: 'bold',
        color: 'black',
        padding: 10,
    },
    sdomCategoryImageRenderer: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    sdomCategoryTextOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sdomCheckboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
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
        color: "#3d3d3d",
        fontSize: 14,
        justifyContent: 'center',
        alignItems: "center"
    },
    textCategoryCity: {
        fontFamily: 'sdom_roman_font',
        color: "#3d3d3d",
        padding: 1,
        fontSize: 12,
        justifyContent: 'center',
        alignItems: "center"
    }
});

export const headerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontWeight: 'bold',
    },
    headerSave: {
        padding: 15,
        top: 2
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