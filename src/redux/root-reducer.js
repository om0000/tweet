import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const addTweetsReducer=(tweets=[],action)=>{
    if(action.type=='ADD_TWEET'){
        return [...tweets,action.payload];
    }else if(action.type=='UPDATE_TWEETS'){
        return action.payload;
    }
    return tweets;
}

const persistConfig={
    key:'root',
    storage,
    whitelist:['tweets']
}

const rootReducer=combineReducers({
    tweets:addTweetsReducer
});

export default persistReducer(persistConfig,rootReducer)