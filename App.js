import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, CardStyleInterpolators } from '@react-navigation/stack';
import { Glance } from './screens/Glance';
import { Category } from './screens/Category';
import { headerStyles } from './styles/Styles';
import { fetchAndUpdateCategoryState } from './helper/Helper.js';
import { Intro } from './screens/Intro';
import { TourGuideProvider, TourGuideZone } from 'rn-tourguide';

export const CategoryContext = React.createContext();

export default class App extends React.PureComponent {

    render() {
        const Stack = createStackNavigator();

        const fetchCategories = (category, setCategory) => {
            fetchAndUpdateCategoryState(category, setCategory);
        }
        const initialCategorySelection = this.props.initialCategorySelection || false;
        const postIdFromNotification = this.props.postIdFromNotification || false;

        return (
            <CategoryContext.Provider value={{ fetchCategories, initialCategorySelection, postIdFromNotification }}>
                <TourGuideProvider androidStatusBarVisible={true}
                    backdropColor={this.props.initialCategorySelection == 'Intro' && `rgba(145, 63, 146, 0.6)`}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName={this.props.navigationRoute}
                            screenOptions={{
                                gestureEnabled: true, gestureDirection: 'horizontal',
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }}
                            headerMode='float' animation="fade">
                            <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                            <Stack.Screen name="Glance" component={Glance} options={{ headerShown: false }} />

                            <Stack.Screen name="Category" component={Category} options={{
                                headerShown: true,
                                headerTitle: 'Select Categories',
                                headerStyle: { backgroundColor: '#3d3d3d' },
                                headerTintColor: '#fff',
                                headerTitleAlign: 'center',
                                headerTitleStyle: headerStyles.headerText,
                                navigationOptions: ({ navigation }) => ({
                                    headerLeft: (
                                        <TourGuideZone zone={2} borderRadius={8} shape={`circle`} text={`Go back to posts Anytime !!`}>
                                            <HeaderBackButton tintColor='#fff' onPress={() => { navigation.goBack() }} />
                                        </TourGuideZone>
                                    )
                                })
                            }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </TourGuideProvider>
            </CategoryContext.Provider>
        )
    }
}
