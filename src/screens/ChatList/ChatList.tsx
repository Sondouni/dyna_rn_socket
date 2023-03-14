import * as React from 'react';
import {View, Image, TouchableOpacity, FlatList, Dimensions,Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import {useEffect, useState } from 'react';
import {io} from "socket.io-client";

export interface Props {
    navigation: any;
}

const socket = io('http://172.30.1.59:3000/chat');

function ChatList({navigation}: any) {

    const [memberId,setMemberId] = useState(null);

    const getMemberId = async () =>{
        const uniqueID = await DeviceInfo.getUniqueId();
        setMemberId(uniqueID);
    }

    useEffect(() => {
        const messageHandler = (res) => {
            console.log(res);
        };

        getMemberId();

        socket.on('message', messageHandler);
        socket.emit('room-list', messageHandler);

        DeviceInfo.getDevice().then((device) => {
            // "walleye"
        });

        return () => {
            // socket.off('message', messageHandler);
        };
    }, []);


    return (
        <SafeAreaView
            style={{paddingHorizontal:20}}
        >
            <View style={{width:'100%',flexDirection:'row',marginVertical:20,justifyContent:'space-between'}}>
                <View>
                    <Text>
                        채팅방리스트
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={()=>{

                        }}
                    >
                        <Text>
                            채팅방만들기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={{width:'100%',flexDirection:'row',marginVertical:20,justifyContent:'space-between'}}>
                    <View>
                        <Text>
                            1
                        </Text>
                    </View>
                    <View>
                        <Text>
                            입장
                        </Text>
                    </View>
                </View>
                <View style={{width:'100%',flexDirection:'row',marginVertical:20,justifyContent:'space-between'}}>
                    <View>
                        <Text>
                            2
                        </Text>
                    </View>
                    <View>
                        <Text>
                            입장
                        </Text>
                    </View>
                </View>
                <View style={{width:'100%',flexDirection:'row',marginVertical:20,justifyContent:'space-between'}}>
                    <View>
                        <Text>
                           3
                        </Text>
                    </View>
                    <View>
                        <Text>
                            입장
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ChatList;
