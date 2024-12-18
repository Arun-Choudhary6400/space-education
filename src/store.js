import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './Redux/Homepage/slice';

export default configureStore({
    reducer: {
        homepage: reducer
    },
})