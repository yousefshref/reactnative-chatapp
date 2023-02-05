import { useFonts } from "expo-font";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }, props) => {

    const [clicked, setClicked] = React.useState(true)

    const [username, setUsername] = React.useState('')
    const [pass, setPass] = React.useState('')

    const [data, setData] = React.useState([])
    const [err, setErr] = React.useState([])
    const [profile, setProfile] = React.useState()


    const logIn = async () => {
        let response = await fetch('http://192.168.1.3:8000/api/token/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: pass
            })
        })
        let data = response.json()
        data.then((e) => setErr(e))
        data.then((e) => setData(jwtDecode(e.access)))
    }

    const createProfile = async () => {
        let response = await fetch(`http://192.168.1.3:8000/createUserProfile/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: username,
            })
        }).then((e) => console.log(e.json().then((e) => console.log(e))))
        AsyncStorage.setItem('profile', username)
    }

    useEffect(() => {
        if (data.username === username) {
            navigation.navigate('home', {
                paramKey: {
                    user: data.username
                }
            })
            AsyncStorage.setItem('user', data.username)
            let da = AsyncStorage.getItem('profile')

            da.then((e) => {
                if (e == username) {
                    // console.log('')
                    return true
                } else {
                    createProfile()
                }
            })

        }


    }, [data])




    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text onPress={() => createProfile()} style={styles.text}>Login</Text>
                <View>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your username"
                        placeholderTextColor={'white'}
                        value={username}
                        onChangeText={e => setUsername(e)}
                    />
                    <Text style={styles.alert}>{err?.username}</Text>
                    <TextInput
                        value={pass}
                        onChangeText={e => setPass(e)}
                        style={styles.TextInput}
                        placeholder="Enter your password"
                        placeholderTextColor={'white'}
                        returnKeyType="done"
                        onSubmitEditing={logIn}
                    />
                    <Text style={styles.alert}>{err?.password}</Text>
                    <Pressable onPress={() => {
                        setClicked(clicked => !clicked)
                        logIn()
                    }}
                        style={clicked ? styles.btnFalse : styles.btnTrue}>
                        <Text style={clicked ? styles.btnTextFalse : styles.btnTextTrue}>Log in</Text>
                    </Pressable>
                    <Text style={styles.already}>new user -
                        <Text
                            onPress={() => navigation.navigate('signup')}
                            style={styles.login}> Sign up now
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '7%',
        backgroundColor: 'black',
        flex: 1
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 40,
        marginBottom: '6%'
    },
    TextInput: {
        color: 'white',
        borderWidth: 1,
        borderColor: '#7286D3',
        padding: 13,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        borderRadius: 13,
    },
    btnFalse: {
        borderWidth: 1,
        backgroundColor: '#7286D3',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 13,
    },
    btnTextFalse: {
        fontSize: 20,
        color: 'white'
    },
    btnTrue: {
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 13,
    },
    btnTextTrue: {
        fontSize: 20,
        color: 'black',
    },
    alert: {
        color: '#7286D3',
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
    },
    already: {
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },
    login: {
        color: '#7286D3',
        marginTop: '5%',
        marginBottom: '5%',
    }
});