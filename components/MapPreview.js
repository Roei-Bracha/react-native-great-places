import React from 'react'
import { Image , View, StyleSheet } from 'react-native';
import env from '../env'
const Component = (props) => {
    let imagePreviewUrl
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${env.googleApiKey}`
    }
    return (
        <View style={{ ...props.style, ...styles.mapPreview }}>
            {imagePreviewUrl ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }}/> : props.children }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems:'center'
    },
    mapImage: {
        height: '100%',
        width:'100%'
    }
})

export default Component