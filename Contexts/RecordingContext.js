import React from "react"
import { Audio } from 'expo-av';

function RecordingContext({ children }) {
    const [recording, setRecording] = React.useState();

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }
    return (
        <RecordingContextProvider.Provider value={{ startRecording, recording, setRecording }}>
            {children}
        </RecordingContextProvider.Provider>
    )
}
export default RecordingContext
export const RecordingContextProvider = React.createContext()