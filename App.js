import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { sdomGlance } from './screens/sdomGlance';
import { SDOMCategory } from './screens/SDOMCategory';
import SideDrawer from './components/SideDrawer'
import { headerStyles } from './styles/sdomStyles';
import { fetchAndUpdateCategoryState, isSaveButtonEnabled } from './helper/SDOMHelper.js';
import { Text, TouchableRipple, Button } from 'react-native-paper';
import { View } from 'react-native';

export const SDOMCategoryContext = React.createContext();

export default function App() {
    const GlanceStack = createStackNavigator();
    const CategoryStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const fetchCategories = (category, setCategory) => {
        fetchAndUpdateCategoryState(category, setCategory);
    }

    const GlanceScreenStack = ({ navigation }) => {
        return (
            <GlanceStack.Navigator screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', headerShown: false }} animation="fade">
                <GlanceStack.Screen name="Glance Screen" component={sdomGlance} />
            </GlanceStack.Navigator>
        )
    }

    const CategoryScreenStack = ({ navigation }) => {
        return (
            <CategoryStack.Navigator screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', headerShown: true }} animation="fade">
                <CategoryStack.Screen name="Category" component={SDOMCategory} options={{
                    headerTitle: 'Select Categories',
                    headerStyle: { backgroundColor: '#3d3d3d' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        <View>
                            <TouchableRipple style={headerStyles.headerSave}
                                onPress={() => alert('This is a button!')}>
                                <Text style={headerStyles.textSave}>Save</Text>
                            </TouchableRipple>
                        </View>
                    },
                    headerTitleStyle: headerStyles.headerText,
                    headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={() => {
                        navigation.goBack();
                    }} />
                }}>
                </CategoryStack.Screen>
            </CategoryStack.Navigator>
        )
    }

    return (
        <SDOMCategoryContext.Provider value={{ fetchCategories }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="SDOMGlance" drawerContent={(props) => <SideDrawer {...props} />}>
                    <Drawer.Screen name="SDOMGlance" component={GlanceScreenStack} />
                    <Drawer.Screen name="Category" component={CategoryScreenStack} />
                </Drawer.Navigator>
            </NavigationContainer >
        </SDOMCategoryContext.Provider>
    )
}
