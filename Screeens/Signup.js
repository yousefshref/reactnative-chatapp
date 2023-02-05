import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native"

export const Signup = ({ navigation }) => {
    const [clicked, setClicked] = React.useState(true)

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [pass2, setPass2] = React.useState('')

    const [data, setData] = React.useState([])
    // const [theme, setTheme] = React.useState('')


    const signUp = async () => {
        await fetch('http://192.168.1.3:8000/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: pass,
                password2: pass2
            })
        })
            .then((response) => response.json())
            .then((data) => setData(data))
    }

    const createProfile = async () => {
        let response = await fetch(`http://192.168.1.3:8000/createUserProfile/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: username,
            })
        })
        AsyncStorage.setItem('profile', username)
    }

    useEffect(() => {
        if (data.username == username) {
            navigation.navigate('home', {
                paramKey: {
                    user: data.username
                }
            })
            AsyncStorage.setItem('user', data.username)
            AsyncStorage.getItem('profile').then((e) => {
                if (e == data.username) {
                    navigation.navigate('home', {
                        paramKey: {
                            user: data.username
                        }
                    })
                }
                if (e !== username) {
                    createProfile()
                }
            })
        }
    }, [data,])


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.text}>Signup</Text>
                <View>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your username"
                        placeholderTextColor={'white'}
                        value={username}
                        onChangeText={e => setUsername(e)}
                    />
                    <Text style={styles.alert}>{data?.username}</Text>
                    <TextInput
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={styles.TextInput}
                        placeholder="Enter your email"
                        placeholderTextColor={'white'}
                    />
                    <Text style={styles.alert}>{data?.email}</Text>
                    <TextInput
                        value={pass}
                        onChangeText={e => setPass(e)}
                        style={styles.TextInput}
                        placeholder="Enter your password"
                        placeholderTextColor={'white'}
                    />
                    <Text style={styles.alert}>{data?.password}</Text>
                    <TextInput
                        returnKeyType="done"
                        onSubmitEditing={signUp}
                        value={pass2}
                        onChangeText={e => setPass2(e)}
                        style={styles.TextInput}
                        placeholder="Confirm your password"
                        placeholderTextColor={'white'}
                    />
                    <Text style={styles.alert}>{data?.password2}</Text>
                    <Pressable onPress={() => {
                        setClicked(clicked => !clicked)
                        signUp()
                    }}
                        style={clicked ? styles.btnFalse : styles.btnTrue}>
                        <Text style={clicked ? styles.btnTextFalse : styles.btnTextTrue}>Sign up</Text>
                    </Pressable>
                    <Text style={styles.already}>already have an account? -
                        <Text
                            onPress={() => navigation.navigate('login')}
                            style={styles.login}> Log in now
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
        borderRadius: 13
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
        borderRadius: 13
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
    }
});