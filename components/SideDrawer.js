import React from 'react'
import { View, ImageBackground } from 'react-native'
import { Drawer } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer'
import { drawerStyles } from '../styles/sdomStyles'

export default function SideDrawer({ props }) {
    return (
        <View style={drawerStyles.drawerContent}>
            <ImageBackground source={require("../assets/sideBarBackgroundImage.png")}
                style={{ width: undefined, paddingTop: 200 }} >
            </ImageBackground>
            <View style={drawerStyles.drawerContent}>
                <Drawer.Section style={drawerStyles.bottomDrawerSection}>
                    <DrawerItem label="Glance" onPress={() => { }} />
                    <DrawerItem label="Category" onPress={() => { }} />
                </Drawer.Section>
            </View>
        </View>
    )
} 