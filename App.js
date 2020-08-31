import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { sdomGlance } from './screens/sdomGlance';
import { sdomCategory } from './screens/sdomCategory';
import SideDrawer from './components/SideDrawer'
import { headerStyles } from './styles/sdomStyles';
import { fetchCategoryData, isSaveButtonEnabled } from './helper/SDOMHelper.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

export const SDOMCategoryContext = React.createContext();

export default function App() {
    const GlanceStack = createStackNavigator();
    const CategoryStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const [category, setCategory] = useState({
        categories: []
    });

    const fetchCategories = useCallback(async () => {
        debugger;
        const categoryData = await fetchCategoryData();

        categoryData.filter((item) => item.posts.length).map((category) => category.isSelected = false);
        setCategory({ ...category, categories: categoryData });
    }, []);

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
                <CategoryStack.Screen name="Category" component={sdomCategory} options={{
                    headerTitle: 'Discover Categories',
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        <TouchableOpacity style={headerStyles.headerSave}
                            onPress={() => alert('This is a button!')}>
                            <Text style={headerStyles.textSave}>Save</Text>
                        </TouchableOpacity>
                    },
                    headerTitleStyle: headerStyles.headerText,
                    headerLeft: () => <HeaderBackButton onPress={() => {
                        navigation.goBack();
                    }} />
                }} />
            </CategoryStack.Navigator>
        )
    }

    return (
        <SDOMCategoryContext.Provider value={{ category, fetchCategories }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="SDOMGlance" drawerContent={(props) => <SideDrawer {...props} />}>
                    <Drawer.Screen name="SDOMGlance" component={GlanceScreenStack} />
                    <Drawer.Screen name="Category" component={CategoryScreenStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SDOMCategoryContext.Provider>
    )
}
