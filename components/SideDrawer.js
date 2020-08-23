import React from 'react'
import { View, ImageBackground } from 'react-native'
import { Drawer } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer'
import { drawerStyles } from '../styles/sdomStyles'
import Icon from 'react-native-vector-icons/AntDesign'

export default function SideDrawer(props) {
    return (
        <View style={drawerStyles.drawerContent}>
            <ImageBackground source={require("../assets/sideBarBackgroundImage.jpg")}
                style={{ width: undefined, paddingTop: 200 }} >
            </ImageBackground>
            <View style={drawerStyles.drawerContent}>
                <Drawer.Section style={drawerStyles.bottomDrawerSection}>
                    <DrawerItem label="Glance" onPress={() => props.navigation.navigate("SDOMGlance")} icon={(focused, color, size) => {
                        <Icon name="bars" color={color} size={size} />
                    }} />
                    <DrawerItem label="Category" onPress={() => props.navigation.navigate("Category")} icon={(focused, color, size) => {
                        <Icon name="home" color={color} size={size} />
                    }} />
                </Drawer.Section>
            </View>
        </View>
    )
} 