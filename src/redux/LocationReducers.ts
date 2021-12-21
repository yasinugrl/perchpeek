import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const data = require('../londonLandmarks.json');

export interface CounterState {
    locations: Array<any>,
    loading: boolean
}

const initialState: CounterState = {
    locations: [],
    loading: false
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getLocation: (state) => {
            console.log('Data: ', data);
            state.locations = data
        },
    },
})

// Action creators are generated for each case reducer function
export const { getLocation } = counterSlice.actions

export default counterSlice.reducer