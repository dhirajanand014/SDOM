import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, CardStyleInterpolators } from '@react-navigation/stack';
import { sdomGlance } from './screens/sdomGlance';
import { SDOMCategory } from './screens/SDOMCategory';
import { headerStyles } from './styles/sdomStyles';
import { fetchAndUpdateCategoryState } from './helper/SDOMHelper.js';
import { SDOMIntro } from './screens/SDOMIntro';

export const SDOMCategoryContext = React.createContext();

export default class App extends React.PureComponent {

    render() {
        const SDOMStack = createStackNavigator();

        const fetchCategories = (category, setCategory) => {
            fetchAndUpdateCategoryState(category, setCategory);
        }
        const initialCategorySelection = this.props.initialCategorySelection || false;

        return (
            <SDOMCategoryContext.Provider value={{ fetchCategories, initialCategorySelection }}>
                <NavigationContainer>
                    <SDOMStack.Navigator initialRouteName={this.props.navigationRoute} screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
                        headerMode='float' animation="fade">
                        <SDOMStack.Screen name="Intro" component={SDOMIntro} options={{ headerShown: false }} />
                        <SDOMStack.Screen name="Glance" component={sdomGlance} options={{ headerShown: false }} />
                        <SDOMStack.Screen name="Category" component={SDOMCategory} options={{
                            headerShown: true,
                            headerTitle: 'Select Categories',
                            headerStyle: { backgroundColor: '#3d3d3d' },
                            headerTintColor: '#fff',
                            headerTitleAlign: 'center',
                            headerTitleStyle: headerStyles.headerText,
                            navigationOptions: ({ navigation }) => ({
                                headerLeft: (<HeaderBackButton tintColor='#fff' onPress={() => { navigation.goBack() }} />)
                            })
                        }}>
                        </SDOMStack.Screen>
                    </SDOMStack.Navigator>
                </NavigationContainer >
            </SDOMCategoryContext.Provider>
        )
    }
}
