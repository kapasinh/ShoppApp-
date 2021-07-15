import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [recording, setRecording] = useState(false);
    const [image, setImage] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={ref => {
                setCameraRef(ref);
            }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'flex-end'
                    }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end'
                            }}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <MaterialCommunityIcons name='cached' size={40} color="white" />

                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
                            if (cameraRef) {
                                let photo = await cameraRef.takePictureAsync();
                                console.log('photo', photo);
                                setImage(photo.uri);
                            }
                        }}>
                            <View style={{
                                borderWidth: 2,
                                borderRadius: 25,
                                borderColor: 'white',
                                height: 50,
                                width: 50,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <View style={{
                                    borderWidth: 2,
                                    borderRadius: 25,
                                    borderColor: 'white',
                                    height: 40,
                                    width: 40,
                                    backgroundColor: 'white'
                                }} >
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
                            if (!recording) {
                                setRecording(true)
                                let video = await cameraRef.recordAsync();
                                console.log('video', video);
                            } else {
                                setRecording(false)
                                cameraRef.stopRecording()
                            }
                        }}>
                            <View style={{
                                borderWidth: 2,
                                borderRadius: 25,
                                borderColor: 'red',
                                height: 50,
                                width: 50,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <View style={{
                                    borderWidth: 2,
                                    borderRadius: 25,
                                    borderColor: 'red',
                                    height: 40,
                                    width: 40,
                                    backgroundColor: 'red'
                                }} >
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
                </View>
            </Camera>
        </View>
    );
}