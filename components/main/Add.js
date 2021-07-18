import { Camera } from 'expo-camera';
import { Component } from 'react';
import { View,Text, NavigatorIOS} from 'react-native';

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';




export class CameraClass extends Component{
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
      }
    async componentDidMount() {
        this.getPermissionAsync()
    }
    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
        // Camera Permission
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasPermission: status === 'granted' });
    }
    
    handleCameraType=()=>{
      const { cameraType } = this.state

      this.setState({cameraType:
        cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
      })
    }
    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          console.log(photo)
        }
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        console.log(result)
    }
    
    
    render(){
        const { hasPermission } = this.state
        if (hasPermission === null) {
          return <View />;
        } else if (hasPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
              <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
                  <View style={{flex:1, flexDirection:"row", alignItems:'flex-end' ,justifyContent:"space-between",margin:30}}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent'                 
                      }}
                      onPress={()=>this.pickImage()}>
                      <MaterialCommunityIcons
                          name="rectangle"
                          style={{ color: "#fff", fontSize: 40}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                      }}
                      onPress={()=>this.takePicture()}
                      >
                      <MaterialCommunityIcons
                          name="circle-slice-8"
                          style={{ color: "#fff", fontSize: 40}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                      }}
                      onPress={()=>this.handleCameraType()}
                      >
                      <MaterialCommunityIcons
                          name="camera-switch"
                          style={{ color: "#fff", fontSize: 40}}
                      />
                    </TouchableOpacity>
                  </View>
                </Camera>
            </View>
          );
        }
    } 
}      
export default CameraClass;
