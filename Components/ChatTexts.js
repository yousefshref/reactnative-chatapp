import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';


export function ChatTexts({ data }) {
    const [user, setUser] = useState('')

    const downloadFile = async (e) => {
        let URL = `http://192.168.1.3:8000${e}`;
        let LocalPath = FileSystem.documentDirectory + "soundss.m4a";
        await FileSystem.downloadAsync(URL, LocalPath)
            .then(async ({ uri }) => {
                const sound = new Audio.Sound()
                await sound.loadAsync({
                    uri: uri
                })
                await sound.playAsync()
            });
    }

    useEffect(() => {
        AsyncStorage.getItem('user').then((e) => setUser(e))
    }, [user, data])

    return (
        <>
            {data.map((e) =>
                <Pressable onLongPress={async () => {
                    await axios.delete(`http://192.168.1.3:8000/deleteMessage/${e.id}`)
                }} key={e.id}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={e.sender == user ? styles.sender : styles.reciver}>
                            {
                                e.message !== ''
                                    ? e.message
                                    :
                                    <Pressable onPress={() => {
                                        downloadFile(e.voicerecord)
                                    }}>
                                        <Image source={require('../assets/play.png')} style={styles.playAudio} />
                                    </Pressable>
                            }
                        </Text>
                        <Text style={e.sender == user ? styles.senderDate : styles.reciverDate}>{e.created}</Text>
                    </View>
                </Pressable>
            )
            }
        </>
    )
}

const styles = StyleSheet.create({
    sender: {
        color: 'white',
        fontSize: 23,
        textAlign: 'right',
        padding: 5,
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginTop: 5,
    },
    senderDate: {
        color: '#7286D3',
        fontSize: 13,
        textAlign: 'right',
        padding: 5,
        marginBottom: 'auto',
        marginTop: -5
    },
    reciverDate: {
        color: '#7286D3',
        fontSize: 13,
        textAlign: 'left',
        padding: 5,
        marginBottom: 'auto',
        marginTop: -5
    },
    reciver: {
        color: 'white',
        fontSize: 23,
        textAlign: 'left',
        padding: 5,
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 5,
    },
    playAudio: {
        tintColor: 'white',
        width: 40,
        height: 40,
        marginRight: -10,
        marginBottom: -10
    }
})