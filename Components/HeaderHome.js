import AsyncStorage from "@react-native-async-storage/async-storage"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

export function HeaderHome({ user }) {

    const navigation = useNavigation()

    const signout = () => {
        AsyncStorage.removeItem('user').then((e) => (e))
        AsyncStorage.removeItem('profile').then((e) => (e))
        navigation.goBack()
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.logout} onPress={() => signout()}> Log out</Text>
            </View>
            <View style={styles.headerCenter}>
                <Text style={styles.hi}>Hi, </Text>
                <Text style={styles.user}>{user}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('adduser', {
                paramKey: {
                    user: user
                }
            })}>
                <View style={styles.headerRight}>
                    <Text style={styles.addUser}>add </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        flex: 9,
    },
    Text: {
        color: 'white'
    },
    header: {
        marginTop: '8%',
        flexDirection: "row",
        borderBottomColor: 'white',
        borderWidth: 0.4,
        paddingBottom: 17,
    },
    container: {
        flex: 10,
    },
    headerCenter: {
        flexDirection: 'row',
        flex: 5,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    hi: {
        color: 'white',
        fontSize: 23,
        marginTop: 5,
    },
    hiLight: {
        color: 'black',
        fontSize: 23,
        marginTop: 5,
    },
    user: {
        color: '#7286D3',
        marginTop: 3,
        fontSize: 23
    },
    userLight: {
        color: '#913175',
        fontSize: 23,
        marginTop: 3,
    },
    logout: {
        color: '#7286D3',
        marginTop: 9,
        fontSize: 17
    },
    addUser: {
        color: '#7286D3',
        fontSize: 17,
        marginTop: 'auto'
    },
    addUserLight: {
        color: '#913175',
        fontSize: 17,
        marginTop: 10
    },
    headerLeft: {
        flex: 4,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    headerRight: {
        flex: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    msg: {
        color: 'white',
        fontSize: 19,
    },
    created: {
        color: 'white',
        fontSize: 19,
    },
    chatingList: {
        margin: 8,
        flex: 5,
    },
    tab: {
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'blue',
    },
    tabcontent: {
        display: 'none',
        padding: 12,
        borderColor: 'orange',
        borderTopWidth: 'none',
    },


    // light styles
    headerLight: {
        marginTop: '8%',
        flexDirection: "row",
        borderBottomColor: 'black',
        borderWidth: 0.4,
        paddingBottom: 17,
        backgroundColor: 'white'
    },
    headerLeftLight: {
        flex: 4,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    logoutLight: {
        color: '#913175',
        fontSize: 17,
        marginTop: 9
    },
})