import React, { useEffect } from 'react';
import { Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { RecordingContextProvider } from '../Contexts/RecordingContext';


const VoiceRecoard = ({ setAudio, audio, senMsg }) => {

    const values = React.useContext(RecordingContextProvider)

    async function stopRecording() {
        values.setRecording(undefined);
        await values.recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = values.recording.getURI();
        setAudio(uri)
    }

    useEffect(() => {
        if (audio !== '') {
            senMsg()
        }
    }, [audio, values.recording])

    return (
        <>
            {
                !values.recording ?
                    <Pressable
                        style={{ position: 'absolute', alignSelf: 'flex-end', }}
                        onPress={() => values.startRecording()}
                    >
                        <Image
                            style={{ tintColor: '#7286D3', width: 50, height: 50, marginLeft: 'auto' }}
                            source={require('../assets/recoard.png')}
                        />
                    </Pressable>
                    :
                    <Pressable
                        style={{ position: 'absolute', alignSelf: 'flex-end' }}
                        onPress={() => stopRecording()}
                    >
                        <Image
                            style={{ tintColor: '#7286D3', width: 50, height: 50, marginLeft: 'auto' }}
                            source={require('../assets/cancelrecord.png')}
                        />
                    </Pressable>
            }
        </>
    )
}
export default VoiceRecoard
export const VoiceRec = React.createContext()