export const ADD_PLACE = 'ADD_PLACE'
import * as FileSystem from 'expo-file-system';


export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop() // look at the image path split it by / and take the last one - the temp image name
        const newPath = FileSystem.documentDirectory + fileName
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
        }
        catch (err) {
            console.log(err)
            throw new Error(err)
        }
        dispatch({ type: ADD_PLACE, placeData: { title, image:newPath } })
    }
}
