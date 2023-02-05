import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function HeaderChat({ friend }) {

    const [profile, setProfile] = useState([]);

    const navigation = useNavigation()

    const getAvatar = async () => {
        const res = await axios.get(`http://192.168.1.3:8000/getprofile/${friend}`)
            .then(function (response) {
                setProfile(response.data);
            })
            .catch(function (error) {
                console.error(error);
            })
    }

    useEffect(() => {
        getAvatar()
    }, [profile])
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrow_back.png')} style={{ tintColor: '#7286D3', height: 20, width: 20, marginTop: 'auto', marginBottom: 'auto', marginLeft: 10 }} />
                </Pressable>
            </View>
            <View style={styles.headerCenter}>
                <Text style={styles.hi}>chatting with </Text>
                <Text style={styles.user}>{friend}</Text>
            </View>
            {profile.map((e) =>
                e.avatar == null || profile == [] ?
                    <Image
                        key={'11'}
                        source={require('../assets/avatar.png')}
                        style={styles.avatarDefault}
                    />
                    :
                    <Image
                        key={e.id}
                        source={{ uri: `http://192.168.1.3:8000${e.avatar}` }}
                        style={styles.avatar}
                    />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: '8%',
        flexDirection: "row",
        borderBottomColor: 'white',
        borderWidth: 0.4,
        paddingBottom: 17,
        width: '100%'
    },
    headerCenter: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    hi: {
        color: 'white',
        fontSize: 23,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    user: {
        color: '#7286D3',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 23,
    },
    headerLeft: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    avatar: {
        width: 45,
        height: 45,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 0,
        marginRight: 10,
    },
    avatarDefault: {
        width: 45,
        height: 45,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 0,
        marginRight: 10,
        tintColor: 'white',
    },
})