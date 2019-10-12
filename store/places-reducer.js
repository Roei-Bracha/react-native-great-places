import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/Place";

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const place = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
          action.placeData.address,
          action.placeData.coords.lat,
          action.placeData.coords.lng
      );
      return { ...state, places: state.places.concat(place) };
    case SET_PLACES:
      return {
        ...state,
        places: action.places.map(
            place => new Place(
                place.id.toString(),
                place.title,
                place.imageUri,
                place.address,
                place.lat,
                place.lng
            )
        )
      };
    default:
      return state;
  }
};
