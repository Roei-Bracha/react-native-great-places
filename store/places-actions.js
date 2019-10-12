import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import env from '../env'
export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
    return async (dispatch) => {
        console.log(location)
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${env.googleApiKey}`)
        if (!response.ok) {
            throw new Error('failed to convert the location')
        }
        const resData = await response.json()
        if (!resData.results) {
            throw new Error('failed to convert the location')
        }
        const address = resData.results[0].formatted_address
        const fileName = image.split('/').pop() // look at the image path split it by / and take the last one - the temp image name
        const newPath = FileSystem.documentDirectory + fileName
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, image, address, location.lat, location.lng)
            console.log(dbResult)
            dispatch({ type: ADD_PLACE, placeData: {id:dbResult.insertId, title, image:newPath, address , coords:{lat:location.lat, lng:location.lng}} })
        }
        catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces()
            dispatch({type:SET_PLACES, places: dbResult.rows._array})
        }
        catch (err) {
            throw(err)
        }
    }
}