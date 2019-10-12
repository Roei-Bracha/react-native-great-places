import React, { useState, useCallback} from 'react'
import { View, Text, Button, StyleSheet, TextInput, ScrollView, } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux'
import { addPlace } from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LoactionPicker';


const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        // you could add validation
        setTitleValue(text);
    };
    
    const savePlaceHandler = () => {
        dispatch(addPlace(titleValue,selectedImage,selectedLocation))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }
    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location)
    },[])
    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} value={titleValue} onChangeText={titleChangeHandler} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <Button title={"Save Place"} color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle:'New Place'
}

const styles = StyleSheet.create({
    form: {
        margin:30
    },
    label:{
        fontSize: 18,
        marginBottom:15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal:2
        
    }
})

export default NewPlaceScreen