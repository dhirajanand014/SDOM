import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { sdomGlance } from './screens/sdomGlance';
import { sdomCategory } from './screens/sdomCategory';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', headerShown: false }} animation="fade">
                <Stack.Screen name="AdminCategory"
                    component={sdomCategory}
                    options={{}} />
                <Stack.Screen
                    name="SDOMGlance"
                    component={sdomGlance}
                    options={{}} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}
