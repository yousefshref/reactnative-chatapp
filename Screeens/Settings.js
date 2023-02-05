import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Footer } from "../Components/Footer";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Switch } from "@react-native-material/core";
import { SettingsProgileEdit } from "../Components/SettingsProfileEdit";


export function Settings() {
    const [img, setImg] = useState(null)
    const [user, setUser] = useState(null)
    const [change, setChane] = useState(false);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImg(result.assets[0].uri)
        }
    };


    const create = async () => {
        let body = new FormData();
        body.append('avatar',
            {
                uri: img,
                name: img,
                filename: 'imageName.png',
                type: 'image/png'
            });
        body.append('Content-Type', 'image/png');

        let res = await fetch(`http://192.168.1.3:8000/userProfileUpdate/${user}`, {
            method: 'POST',
            body: body
        })
            .then((res) => res.json())
            .then((res) => { ("response" + JSON.stringify(res)); })
            .catch((e) => (e))
    }



    useEffect(() => {
        const u = AsyncStorage.getItem('user')
        u.then((e) => setUser(e))
        if (img == null) {
            setImg(img)
        }
    }, [img, user])


    return (
        <>
            <View style={styles.container}>
                <ScrollView>

                    <SettingsProgileEdit user={user} setChane={setChane} />

                    <View style={{ marginTop: 23, width: '90%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#282A3A', padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: '500' }}>Privacy and secure</Text>
                    </View>
                    <View style={{ marginTop: 23, width: '90%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#282A3A', padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: '500' }}>Groups and rooms</Text>
                    </View>
                    <View style={{ marginTop: 23, width: '90%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#282A3A', padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: '500' }}>story privacy</Text>
                    </View>
                    <View style={{ marginTop: 23, width: '90%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#282A3A', padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: '500' }}>policy and privacy</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 23, width: '90%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#282A3A', padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: '500' }}>Note:</Text>
                        <Text style={{ color: '#93C6E7', fontSize: 20, fontWeight: '500' }}>This program is under development and renewal. Please,
                            if there is an error or it does not work efficiently, write to the developers by mistake</Text>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Footer />
                </View>
                {
                    change ? <ScrollView style={{
                        backgroundColor: '#301E67', position: 'absolute', width: '100%',
                        bottom: 0, height: '80%', borderRadius: 20, padding: 10
                    }}>
                        <View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Chang your image</Text>
                                <Pressable style={{ borderRadius: 10, padding: 10, marginTop: 10, width: '90%', backgroundColor: 'orange', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }} onPress={() => {
                                        pickImage()
                                    }}>Choose photo from your gallary</Text>
                                </Pressable>
                                <View>
                                    {
                                        img ? <Image source={{ uri: img }} style={{ width: 300, height: 300, marginTop: 10, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }} /> : null
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }} onPress={() => {
                                        create()
                                        setChane(false)
                                    }}>Done</Text>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }} onPress={() => setChane(false)}>cancel</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView> : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
})