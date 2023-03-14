import * as React from 'react';
import {View, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import ChatList from "../screens/ChatList/ChatList";
import ChatRoom from "../screens/ChatRoom/ChatRoom";
import {NavigationContainer} from "@react-navigation/native";
import ChatCreate from "../screens/ChatCreate/ChatCreate";

export interface Props {
    navigation: any;
}

const Stack = createNativeStackNavigator();

function AppNavigation({navigation}: any) {




    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'ChatList'}>
                <Stack.Screen name={'ChatList'} component={ChatList}/>
                <Stack.Screen name={'ChatRoom'} component={ChatRoom}/>
                <Stack.Screen name={'ChatCreate'} component={ChatCreate}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
