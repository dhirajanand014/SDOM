import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { sdomGlance } from './screens/sdomGlance';
import { sdomCategory } from './screens/sdomCategory';
import SideDrawer from './components/SideDrawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function App() {
    const GlanceStack = createStackNavigator();
    const CategoryStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const GlanceScreenStack = ({ navigation }) => {
        return (
            <GlanceStack.Navigator screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', headerShown: false }} animation="fade">
                <GlanceStack.Screen name="Glance Screen" component={sdomGlance} />
            </GlanceStack.Navigator>
        )
    }

    const CategoryScreenStack = ({ navigation }) => {
        return (
            <CategoryStack.Navigator screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', headerShown: false }} animation="fade">
                <CategoryStack.Screen name="Category" component={sdomCategory} />
            </CategoryStack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="SDOMGlance" drawerContent={props => <SideDrawer {...props} />}>
                <Drawer.Screen name="SDOMGlance" component={GlanceScreenStack} options={{
                    drawerIcon: ({ focused, size }) => (
                        <Icon name="view-grid-plus-outline" size={16} />
                    )
                }} />
                <Drawer.Screen name="Category" component={CategoryScreenStack} options={{
                    drawerIcon: ({ focused, size }) => (
                        <Icon name="view-grid-plus-outline" size={16} />
                    )
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
