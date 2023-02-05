import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export function Footer() {
    const [btnSelected, setBtnSelected] = useState('home')

    const route = useRoute();

    const navigation = useNavigation();

    const [user, setuser] = useState('')



    useEffect(() => {
        if (route.name == 'home') {
            setBtnSelected('home')
        }
        if (route.name == 'adduser') {
            setBtnSelected('adduser')
        }
        if (route.name == 'settings') {
            setBtnSelected('settings')
        }
    }, [btnSelected, route])


    AsyncStorage.getItem('user').then((e) => { setuser(e) })

    return (
        <View style={styles.footer}>
            <Pressable
            // onPress={() => {
            // setBtnSelected(1)
            // navigation.navigate('adduser', {
            //     paramKey: {
            //         user: user
            //     }
            // })
            // }}
            ><Image source={require('../assets/photo_camera.png')} style={(btnSelected == 1) ? styles.btnSelected : styles.notSelected} />
            </Pressable>
            <Pressable onPress={() => {
                navigation.navigate('home', {
                    paramKey: {
                        user: user
                    }
                })
            }
            }><Image source={require('../assets/chat.png')} style={btnSelected == 'home' ? styles.btnSelected : styles.notSelected} />
            </Pressable>
            <Pressable onPress={() => {
                navigation.navigate('adduser', {
                    paramKey: {
                        user: user
                    }
                })
            }
            }><Image source={require('../assets/personadd.png')} style={btnSelected == 'adduser' ? styles.btnSelected : styles.notSelected} />
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate('settings', {
                        paramKey: {
                            user: user
                        }
                    })
                }
                }
            ><Image source={require('../assets/settings.png')} style={btnSelected == 'settings' ? styles.btnSelected : styles.notSelected} />
            </Pressable >
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: 10,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopColor: 'white',
        borderTopWidth: 0.3,
        paddingTop: 13,
        backgroundColor: 'black',
        // marginLeft: '3%',
        // marginRight: 'auto',
    },
    btnSelected: {
        tintColor: '#7286D3',
        height: 40,
        width: 40,
        marginTop: 'auto',
        marginBottom: 10,
    },
    notSelected: {
        tintColor: 'white',
        height: 40,
        width: 40,
        marginTop: 'auto',
        marginBottom: 10,
    }
})

// 7286D3

