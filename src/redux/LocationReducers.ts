import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LatLang {
    latitude: number
    longitude: number
}


export interface LandMarks {
    description: string
    id: number
    image: string
    name: string
    latlng: LatLang
    isLike: boolean
}

export interface AppState {
    locations: Array<LandMarks>
    loading: boolean
}

const initialState: AppState = {
    locations: [],
    loading: false
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getLocations: (state) => {
            let data = require('../londonLandmarks.json');
            const finalData = data.map((dt: LandMarks) => {
                dt.isLike = false
                return dt
            })
            state.locations = finalData
        },

        updateLocation: (state, action: PayloadAction<number>) => {
            const finalData = state.locations.map((dt: LandMarks) => {
                action.payload == dt.id ?  dt.isLike = !dt.isLike : null
                return dt
            })
            state.locations = finalData
        },
    },
})

// Action creators are generated for each case reducer function
export const { getLocations, updateLocation  } = counterSlice.actions

export default counterSlice.reducer