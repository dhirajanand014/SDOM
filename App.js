import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { sdomGlance } from './screens/sdomGlance';


// const Screens = {
//     SDOMGlance: {
//         screen: sdomGlance
//     }
// }
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SDOMGlance"
                    component={sdomGlance}
                    options={{ title: 'SDOMGlance' }} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}
