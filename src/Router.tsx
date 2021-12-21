import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';


type SharedStackParams = {
    List: undefined;
    Detail: {
        id: number;
        src: string;
    };
};
const { Navigator, Screen } = createSharedElementStackNavigator<SharedStackParams>();

function Router() {


    return (
        <NavigationContainer>
            <Navigator initialRouteName="List" headerMode='none'>
                <Screen name="List" component={ListScreen} />
                <Screen
                    name="Detail"
                    component={DetailScreen}
                    options={() => ({
                        headerBackTitleVisible: false,
                        cardStyleInterpolator: ({ current: { progress } }) => {
                            return {
                              cardStyle: {
                                opacity: progress
                              }
                            };
                        },
                        transitionSpec: {
                            open: { animation: 'timing', config: { duration: 300 }},
                            close: { animation: 'timing', config: { duration: 300 }}
                        }
                    })}
                    sharedElementsConfig={(route, otherRoute, showing) => {
                        const { item } = route.params;
                        return [{
                            id: `item.${item.id}.photo`,
                            animation: 'fade-in',
                        },
                        {
                            id: `item.${item.id}.name`,
                            animation: 'fade-in',
                        },

                        ];
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}


export default Router;