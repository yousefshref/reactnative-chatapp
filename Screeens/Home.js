import { StyleSheet, View } from "react-native";
import { Footer } from "../Components/Footer";
import { ChatsList } from '../Components/ChatsList';
import { HeaderHome } from "../Components/HeaderHome";


export function Home({ route }, props) {
    const user = route.params.paramKey.user

    return (
        <View style={styles.container}>
            <HeaderHome user={user} />
            <ChatsList user={user} />
            <Footer navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
    }
})

// 7286D3





