import * as React from 'react';
import { useState } from 'react';
import {View, Image, TouchableOpacity, FlatList, Dimensions, TextInput} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

export interface Props {
    navigation: any;
}

function ChatCreate({navigation,route}: any) {

    const [memberId,setMemberId] = useState(route.params.memberId);
    const [chatName,setChatName] = useState('');




    return (
        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View>
                <TextInput

                />
            </View>
        </SafeAreaView>
    );
}

export default ChatCreate;
