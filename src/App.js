/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {io} from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';
import AppNavigation from './navigation/AppNavigation';


const App: () => Node = () => {

    return(
        <>
            <AppNavigation/>
        </>
    )
};


export default App;
