import appReducer from '../Reducers/reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
    let result
    console.groupCollapsed(`Dispatching action => ${action.type}`)
    result = next(action)
    console.log(store.getState())
    console.groupEnd()
    return result
}

export default (initialState={}) => applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)