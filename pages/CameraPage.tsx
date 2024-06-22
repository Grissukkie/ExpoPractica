import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Crypto from "expo-crypto"
import { Cloudinary } from '@cloudinary/url-gen';




export default function CameraPage() {
  const [facing, setFacing] = useState('back' as any);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (photo) {
    return <Image style={{width: 300, height: 600}} source={photo.uri}/>
  }
   function takePhoto() {
     if (cameraRef.current) {
       cameraRef.current.takePictureAsync({
         base64: true,
         skipProcessing: true
       }).then((PhotoData) =>{uploadCloudRaw(PhotoData?.base64)})
    }
  }

  function toggleCameraFacing() {
    setFacing((current: any) => (current === 'back' ? 'front' : 'back'));
  }

    async function uploadCloudRaw(base64: string) {
    const uuid = Crypto.randomUUID()
    const base64image = "data: image/jpeg;base64," + base64
    const formData = new FormData()
    
    formData.append("file", base64image, "file")
    formData.append("upload_preset", "xrc31eiy" )
    formData.append("public_id", uuid)

    const response = await fetch("https://api.cloudinary.com/v1_1/dulmx8epq/image/upload", {method: "POST", body: formData}).then(res => res.json()).catch(error => error)
    console.log(response)

}

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );


}

 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});