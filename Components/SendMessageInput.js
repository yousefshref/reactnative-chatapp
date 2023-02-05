import { TextInput } from "@react-native-material/core"
import axios from "axios"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import VoiceRecoard from "./VoiceRecoard";


export function SendMessageInput({ user, friend }) {
    const [message, setMessage] = useState('')
    const [audio, setAudio] = useState('')
    const date = new Date()


    const senMsg = async () => {
        let data = new FormData()
        data.append('sender', user)
        data.append('reciver', friend)
        data.append('whosend', user + friend)
        data.append('message', message)
        data.append('created', date.toLocaleDateString() + ' - ' + date.toLocaleTimeString())
        data.append('voicerecord', audio ? {
            uri: audio,
            name: audio,
            type: 'm4a'
        } : audio)
        const res = await axios(
            {
                method: "POST",
                url: `http://192.168.1.3:8000/chatlistfriends/${user}/${friend}/create`,
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )
            .then((res) => (res.data))
            .finally(() => {
                setMessage('')
                setAudio('')
            })
    }


    return (
        <View style={styles.sendmessage}>
            <TextInput
                placeholder="Enter your message"
                returnKeyType="send"
                style={styles.inputSend}
                onChangeText={(e) => setMessage(e)}
                value={message}
                onSubmitEditing={() => { message == '' ? alert('you should write a message') : senMsg() }}
            />
            <VoiceRecoard senMsg={senMsg} setAudio={setAudio} audio={audio} />
        </View>
    )
}

const styles = StyleSheet.create({
    sendmessage: {
        backgroundColor: '#181818',
    },
    inputSend: {
        width: '100%',
        marginBottom: 'auto',
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingRight: 50
    },
})