import { TextInput } from "@react-native-material/core";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Footer } from "../Components/Footer";

export function AddUser({ navigation, route }) {

    const [friend, setFriend] = useState('')

    const user = route.params.paramKey.user


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Search on friend you know</Text>
            </View>
            <View style={styles.sendmessage}>
                <TextInput
                    placeholder="Enter your message"
                    returnKeyType="send"
                    style={styles.inputSend}
                    onChangeText={(e) => setFriend(e)}
                    value={friend}
                    onSubmitEditing={() => {
                        friend == '' ? alert('you should write your friend name') :
                            navigation.navigate('chat', {
                                paramKey: {
                                    friend: friend,
                                    user: user
                                }
                            })
                    }
                    }
                />
                <Pressable onPress={() => {
                    friend == '' ? alert('you should write your friend name') :
                        navigation.navigate('chat', {
                            paramKey: {
                                friend: friend,
                                user: user
                            }
                        })
                }} style={styles.btnSend}>
                    <Text style={styles.btnTextSend}>SEND</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 10
    },
    sendmessage: {
        flexDirection: 'row',
        backgroundColor: '#181818',
        marginTop: '10%'
    },
    inputSend: {
        width: '80%',
        marginBottom: 10,
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    btnSend: {
        width: '20%',
        backgroundColor: '#7286D3',
        padding: 12,
        marginBottom: 14,
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 55
    },
    btnTextSend: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        marginTop: '30%',
        fontSize: 27,
        textAlign: 'center'
    }
})