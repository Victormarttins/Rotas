import { useState } from "react";
import { FlatList, View } from "react-native";
import ChatEntity from "../entities/chat-Entity";

export default function ChatPage({ navigation,}) {


    const [author, setauthor] = useState('');
    const [message, setMessage] = useState<ChatEntity[]>([
        {
            id: '1',
            message: 'Olá,tudo bem?',
            sender: 'victor hugo',
            data: 16310000000,
        },
        {
            id: '2',
            message: 'tudo e você?',
            sender: 'victor hugo',
            data: 16310000000,
        }


    ]);
    const[listref,setlistref]=useState(null);
    const[Messages,setMessages]=useState('');

    <View style={{ justifyContent: "center", backgroundColor: '#fff', height: '100%', width: "100%" }}>
        <FlatList

            ref={(ref=>{setlistref(ref)}) }
            data={message}
            renderItem={({ item }) => {
                return (
                    item.sender === author ?
                        <View>{/* area de menssagem recebida*/}</View> :
                        <View>{/* area de menssagem enviada*/}</View>
                )

            }} 
            
        />
       

       





    </View>

}