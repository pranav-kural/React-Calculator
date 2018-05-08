import { combineReducers } from 'redux'
import Action from '../Actions/Constants'

const calcOpSelected = (state="none", action) =>
    (action.type === Action.SET_CURRENT_CALC_OP) ?
        action.payload : state;

const prevNum = (state="", action) =>
    (action.type === Action.SET_PREV_NUM) ?
        action.payload : state;

const num = (state="", action) => {
    switch (action.type) {
        case Action.SET_NUM:
            return action.payload
        case Action.CLEAR_NUM:
            return []
        default:
            return state
    }
}

const symbOnDis = (state="0", action) =>
    (action.type === Action.SET_SYMBOL_ON_DISPLAY) ?
        action.payload : state;

const dotPresentInNum = (state=false, action) =>
    (action.type === Action.SET_DOT_IN_NUM) ?
        action.payload : state;

const currentHis = (state=[], action) => {

    switch (action.type) {

        case Action.ADD_TO_CURRENT_HISTORY :
            return [...state.currentHis, action.payload];

        case Action.REMOVE_LAST_FROM_CURRENT_HISTORY :
            let currentHis = [...state.currentHis];

            if (currentHis !== []) {
                currentHis.pop(1);
                return currentHis;
            } else {
                return [];
            }

        case Action.CLEAR_CURRENT_CALCULATION :
            return [];

        default: return [];

    }

}

const completeHis = (state=[], action) =>
    (action.type === Action.ADD_TO_COMPLETE_HISTORY) ?
        [...state.completeHis, state.currentHis] : state;

export default combineReducers({
    calcOpSelected,
    prevNum,
    num,
    symbOnDis,
    dotPresentInNum,
    currentHis,
    completeHis
})