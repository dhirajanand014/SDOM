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
        marginBottom: 5,
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginBottom: 14,
    },
    titleName: {
        marginRight: 4,
        fontSize: 24,
        fontWeight: '700',
        display: 'flex',
        color: 'white',
    },
    titleText: {
        fontSize: 16,
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
    icon: {
        tintColor: 'white',
    },
    linkButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.5)',
    },
    smallButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
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
        top: 12,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressBar: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    }
});

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
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        backgroundColor: 'rgba(0,0,0,.6)',
        overflow: 'hidden',
        margin: 5,
        borderRadius: 10,
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
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
    checkbox: {
        position: "absolute",
        bottom: 0,
        alignSelf: "flex-end"
    }
});

export const drawerStyles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    drawerSection: {
        paddingLeft: 20
    },
    bottomDrawerSection: {
        marginBottom: 15,
        flex: 1,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
})