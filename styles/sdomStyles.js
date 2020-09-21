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
        paddingLeft: 10,
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
        fontSize: 24,
        fontWeight: '700',
        display: 'flex',
        color: 'white',
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 16,
        color: 'white',
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
        marginTop: 30,
        width: 32,
        height: 32
    },
    icon_post_search: {
        width: 26,
        height: 26
    },
    icon_post_description: {
        width: 32,
        height: 32
    },
    icon_post_wallpaper: {
        width: 32,
        height: 32
    },
    icon_post_download: {
        width: 32,
        height: 32
    },
    icon_external_link: {
        width: 32,
        height: 32
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    scrollViewDescription: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 90,
    },
    smallButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        height: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    smallButtonWithTextIconContainer: {
        marginRight: 12,
    },
    searchIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 60,
        width: 32,
        right: 70,
        height: 32,
    },
    largeButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 177,
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
        width: 250,
        top: 30,
        justifyContent: 'space-evenly',
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
        fontWeight: "bold",
        textAlign: "center"
    },
    modalButton: {
        borderRadius: 20,
        marginTop: 20,
        padding: 10,
        elevation: 2
    },
    glanceTopIcons: {
        paddingTop: 12,
        paddingLeft: 2,
        paddingBottom: 2,
        paddingRight: 2
    },
    glanceTopIconInfo: {
        padding: 1
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
        width: '100%',
        height: '100%'
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
        flex: 1,
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
    },
    textSave: {
        color: "#fff",
        fontWeight: "bold"
    }
});