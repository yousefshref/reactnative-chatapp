import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function ChatsList({ user }) {
    const [chatList, setChatList] = useState([])
    const [friendStartChat, setFirendStartChat] = useState('')

    const navigation = useNavigation();

    function startChat(e) {
        setFirendStartChat(e._dispatchInstances.memoizedProps.children)
        if (e._dispatchInstances.memoizedProps.children == friendStartChat) {
            navigation.navigate('chat', {
                paramKey: {
                    user: user,
                    friend: friendStartChat
                }
            })
        }
    }

    function removeDuplicates(arr) {
        let unique = arr.reduce(function (acc, curr) {
            if (!acc.includes(curr))
                acc.push(curr);
            return acc;
        }, []);
        return unique;
    }

    async function getChatList() {
        let res = await axios.get(`http://192.168.1.3:8000/chatlistfriends/${user}`)
            .then(function (response) {
                // handle success
                setChatList(removeDuplicates(response.data.map((r) => r.reciver)))
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        getChatList()
    }, [chatList])

    return (
        <ScrollView style={styles.ScrollView}>
            <View style={styles.chatingList}>
                {chatList.length !== 0 ? chatList.map((e) =>
                    <Pressable key={e}>
                        <View style={styles.friendContainer}>
                            <View style={styles.appove}>
                                <Text onPress={(e) => startChat(e)}
                                    style={styles.name}>{e}</Text>
                            </View>
                        </View>
                    </Pressable>
                )
                    :
                    <View>
                        <View key={'11'}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 21, textAlign: 'center', marginTop: '10%' }}>Add new user to start chatting !!</Text>
                            <Pressable onPress={() => navigation.navigate('adduser', {
                                paramKey: {
                                    user: user
                                }
                            })} style={{ color: 'white', fontSize: 21, textAlign: 'center', marginTop: '10%', backgroundColor: '#7286D3', borderRadius: 200, padding: 10 }}>
                                <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>ADD USER</Text>
                            </Pressable>
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        flex: 9,
    },
    chatingList: {
        margin: 8,
        flex: 5,
    },
    friendContainer: {
        backgroundColor: '#474E68',
        padding: 10,
        borderRadius: 15,
        marginTop: 6,
        marginBottom: 20,
    },
    friendContainerLight: {
        backgroundColor: '#7286D3',
        padding: 10,
        borderRadius: 15,
        marginTop: 6,
        marginBottom: 20,
    },
    name: {
        color: 'white',
        fontSize: 19
    },
    nameLight: {
        color: 'black',
        fontSize: 19
    },
})
