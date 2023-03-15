import * as React from 'react';
import { useState } from 'react';
import {View, Image, TouchableOpacity, FlatList, Dimensions, TextInput,Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {io} from "socket.io-client";

export interface Props {
    navigation: any;
}

const socket = io('http://172.30.1.59:3000/chat');

function ChatCreate({navigation,route}: any) {

    const [memberId,setMemberId] = useState(route.params.memberId);
    const [chatName,setChatName] = useState('');




    return (
        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View>
                <TextInput
                    value={chatName}
                    onChangeText={text=>{
                        setChatName(text);
                    }}
                    placeholder={'채팅장 이름을 입력해'}
                />
                <View style={{marginTop:50,width:100,height:30}}>
                    <TouchableOpacity
                        onPress={()=>{
                            socket.emit(
                                'room-create',
                                {
                                    chatName,
                                    memberId
                                }
                            )
                            navigation.goBack();
                        }}
                    >
                        <View style={{padding:5,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white'}}>
                                입력
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ChatCreate;
