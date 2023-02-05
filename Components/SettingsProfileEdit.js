import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'

export function SettingsProgileEdit({ user, setChane }) {

    const [profile, setProfile] = useState([]);


    const getProfile = async () => {
        let response = await fetch(`http://192.168.1.3:8000/getprofile/${user}`)

        let data = response.json()
        data.then((e) => setProfile(e))
    }

    useEffect(() => {
        getProfile()
    }, [getProfile, profile])

    return (
        <View style={styles.header}>
            {
                profile.map((e) =>
                    e.avatar !== null ?
                        <Image
                            key={e.id}
                            style={styles.avatar}
                            source={{ uri: `http://192.168.1.3:8000${e.avatar}` }}
                        /> :
                        <Image
                            key={'e.id'}
                            style={styles.avatar}
                            source={require('../assets/avatar.png')}
                        />
                )
            }
            <Text style={styles.user}>{user}</Text>
            <Text style={styles.edit} onPress={() => {
                setChane(change => !change)
            }}>Edit</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flex: 0.1,
        width: '90%',
        marginTop: 50,
        backgroundColor: '#7286D3',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 6
    },
    user: {
        color: 'white',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10,
        marginRight: 'auto',
        fontSize: 23
    },
    edit: {
        color: '#13005A',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 10,
        fontSize: 20,
        fontWeight: '800'
    },
    avatar: {
        margin: 'auto',
        width: 45,
        height: 45,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 10,
        marginRight: 10,
    },
})