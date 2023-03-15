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
    const [chatList,setChatList] = useState(null);

    const getMemberId = async () =>{
        const uniqueID = await DeviceInfo.getUniqueId();
        setMemberId(uniqueID);
    }

    useEffect(() => {
        const roomListHandler = (res) => {
            setChatList(res);
        };

        getMemberId();

        socket.on('room-list', roomListHandler);
        socket.emit('room-list', roomListHandler);

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
                            navigation.navigate('ChatCreate',{memberId})
                        }}
                    >
                        <Text>
                            채팅방만들기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {chatList?.length>0 &&chatList.map((item,index)=>{
                    return(
                        <View style={{width:'100%',flexDirection:'row',marginVertical:20,justifyContent:'space-between'}}>
                            <View>
                                <Text>
                                    {item.chat_name}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{
                                    socket.emit('join-room', {...item,member_id:memberId});
                                    navigation.navigate('ChatRoom',{chatCd:item.chat_cd,socket});
                                }}
                            >
                                <View>
                                    <Text>
                                        입장
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    );
}

export default ChatList;
