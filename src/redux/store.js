import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";


import {
      persistStore,
      persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    } from 'redux-persist'
    import storage from 'redux-persist/lib/storage'
import messageSlice from "./messageSlice";
import socketSlice from "./socketSlice";
   



    const persistConfig = {
      key: 'root',
      version: 1,
      storage,
    }

const rootReducer= combineReducers({
      user:userSlice,
      tweet:tweetSlice,
      message:messageSlice,
      socket:socketSlice
})

    const persistedReducer = persistReducer(persistConfig, rootReducer)


const store= configureStore({
      reducer:persistedReducer,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
      
      // {
        
      //    user:userSlice,
      //    tweet:tweetSlice

      // }
});

export default store;