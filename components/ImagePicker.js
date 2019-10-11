import React from 'react'
import { View, Text, Button ,StyleSheet, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = (props) => {

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert('Permissions Error', 'you need to allow us to use the camera', [{ text: 'OK' }])
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermissions = verifyPermission()
        if (!hasPermissions) {
            return
        }
        ImagePicker.launchCameraAsync()
    }
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>No image picked yet</Text>
                <Image style={styles.image}/>
                <Button title={'Take Image'} color={Colors.primary} onPress={takeImageHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems:'center'
    },
    imagePreview: {
        width: '100%',
        height:200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth:1
    },
    image: {
        width:'100%'
    }
})

export default ImgPicker