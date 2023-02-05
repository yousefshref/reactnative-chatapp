import axios from "axios";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { HeaderChat } from "../Components/ChatHeader";
import { Chats } from "../Components/Chats";
import { SendMessageInput } from "../Components/SendMessageInput";



export function Chat({ route }) {
    const user = route.params.paramKey.user
    const friend = route.params.paramKey.friend
    const [data, setData] = useState([])


    const getChat = async () => {
        const res = await axios.get(`http://192.168.1.3:8000/chatlistfriends/${user}/${friend}`)
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getChat()
    }, [friend, getChat])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerAll}>
            {/* Header */}
            <HeaderChat friend={friend} />
            {/* Chat & Input */}
            <Chats data={data} />
            <SendMessageInput user={user} friend={friend} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
    },
})