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
        justifyContent: 'space-evenly'
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
    icon: {
        tintColor: 'white',
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 25,
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
    largeButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 32,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    progressBarContainer: {
        bottom: 100,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    glanceTopIcons: {
        padding: 15
    },
    progressBar: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
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