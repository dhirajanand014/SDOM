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
        marginRight: 4,
        fontSize: 22,
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
        fontSize: 12,
        fontFamily: 'sdom_bold_font',
        display: 'flex',
        color: 'white',
    },
    postCategoriesIn: {
        fontSize: 12,
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
        width: 28,
        height: 28
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
        marginBottom: 65
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
        margin: 40
    },
    modalView: {
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        maxHeight: 250,
        width: 300,
        top: 30,
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
    icon_count_text: {
        color: "white",
        fontFamily: 'sdom_roman_font',
        textAlign: "center",
        fontSize: 10
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
        borderRadius: 16,
        marginTop: 10,
        padding: 10,
        elevation: 3,
        backgroundColor: "#fcc200"
    },
    postReportAbuse: {
        position: 'absolute',
        left: 20,
        bottom: 25,
        marginTop: 15,
        elevation: 3,
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
        flex: 1 / 2,
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
        elevation: 8,
        height: 180,
        width: 180,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginVertical: 5,
        borderRadius: 8,
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