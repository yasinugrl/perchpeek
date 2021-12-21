import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';


const RootStack = createSharedElementStackNavigator();

function Router() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }} mode="modal">
                <RootStack.Screen name="List" component={ListScreen} />
                <RootStack.Screen
                    name="Detail"
                    component={DetailScreen}
                    sharedElementsConfig={(route, otherRoute, showing) => {
                        const { item } = route.params;
                        return [`item.${item.id}.photo`];
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}


export default Router;