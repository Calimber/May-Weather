import {createStore} from 'redux'
import {reducer} from "./tableReducer";

export const store = createStore(reducer)