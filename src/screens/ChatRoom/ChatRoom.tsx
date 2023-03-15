import * as React from 'react';
import { useEffect, useState } from 'react';
import {View, Image, TouchableOpacity, FlatList, Dimensions,Text, TextInput} from 'react-native';
import DeviceInfo from "react-native-device-info";
import {io} from "socket.io-client";

export interface Props {
    navigation: any;
}


function ChatRoom({navigation,route}: any) {

    const [memberId,setMemberId] = useState(null);
    const [chatCd,setChatCd] = useState(route.params.chatCd);
    const [chatContent , setChatContent] = useState([]);
    const [myChat,setMyChat] = useState('');
    const [socket] = useState(route.params.socket);
    const getMemberId = async () =>{
        const uniqueID = await DeviceInfo.getUniqueId();
        console.log(uniqueID,'sadasda');
        setMemberId(uniqueID);
        return uniqueID;
    }

    const roomContentHandler = (res) =>{
        console.log(res,'룸 콘텐트 리스너',memberId)
        setChatContent(state=>{
            return state.concat(res);
        });
    }

    useEffect(() => {
        getMemberId();
        socket.emit('chat-content', {chat_cd:chatCd},(res)=>{
            console.log(res);
            if(res!=null&&res.list!=null&&res.list.length>0){
                let tempArr = [];
                res.list.forEach((item)=>{
                    tempArr.push({message:item.content})
                });
                setChatContent(state=>{
                    return state.concat(tempArr);
                });
            }
        });
        socket.on('message', roomContentHandler);
        return () => {
            socket.off('message', roomContentHandler);
        };
    }, []);


    return (
        <View>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <View>
                    <Text>
                        채팅
                    </Text>
                </View>
                <View style={{width:100,height:50}}>
                    <TextInput
                        placeholder={'메세지를 입력해주세여'}
                        style={{backgroundColor:'yellow'}}
                        value={myChat}
                        onChangeText={(text)=>{
                            setMyChat(text);
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={async ()=>{
                        socket.emit('message',{
                            memberId,
                            chat_cd:chatCd+'',
                            message:myChat
                        },(res)=>{
                            console.log(res.messageObj.message,'res');
                            setChatContent(state=>{
                                return state.concat({message:res.messageObj.message});
                            });
                        })

                        setMyChat('');
                    }}
                >
                    <View style={{backgroundColor:'black',width:70,height:50}}>
                        <Text style={{color:'white'}}>
                            보내기
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {chatContent.length>0&&chatContent.map((item,index)=>{
                return(
                    <View style={{marginVertical:20}}>
                        <View>
                            <Text>
                                {item.message}
                            </Text>
                        </View>
                    </View>
                    )
            })}

        </View>
    );
}

export default ChatRoom;
