import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native"
import { ChatTexts } from "./ChatTexts";
import { Audio } from 'expo-av';

export function Chats({ data }) {
    const [user, setUser] = useState('')

    const scrollViewRef = useRef();

    function scrollViewSizeChanged(height) {
        scrollViewRef.current?.scrollTo({ y: height, animated: true });
    }

    useEffect(() => {
        AsyncStorage.getItem('user').then((e) => setUser(e))
    }, [user])


    return (
        <ScrollView
            ref={scrollViewRef} onContentSizeChange={async (width, height) => {
                scrollViewSizeChanged(height)
                const sound = new Audio.Sound()
                await sound.loadAsync(require('../assets/audios/reciver.mp3'))
                await sound.playAsync()
            }} style={styles.chat}>
            <ChatTexts data={data} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chat: {
        backgroundColor: 'black',
        flex: 1
    },
    sender: {
        color: 'white',
        fontSize: 23,
        textAlign: 'right',
        padding: 5
    },
    senderDate: {
        color: '#7286D3',
        fontSize: 13,
        textAlign: 'right',
        padding: 2
    },
    reciverDate: {
        color: '#7286D3',
        fontSize: 13,
        textAlign: 'left',
        padding: 2
    },
    reciver: {
        color: 'white',
        fontSize: 23,
        textAlign: 'left',
        padding: 5
    },
})