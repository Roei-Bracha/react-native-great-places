import { ADD_PLACE } from "./places-actions"
import Place from "../models/Place"

const initialState = {
    places:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const place = new Place(new Date().toISOString(), action.placeData.title, action.placeData.image)
            return {...state,places:state.places.concat(place)}
        default:
            return state
    }
}