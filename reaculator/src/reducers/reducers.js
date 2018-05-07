import React from 'react'
import { combineReducers } from 'redux'
import Action from '../Actions/Constants'

const calcOpSelected = (state="none", action) =>
    (action.type === Action.ADD_OPERATOR_TO_CALC) ?
        action.payload : state;

const prevNum = (state=null, action) =>
    (action.type === Action.CALC_PREVIOUS_RESULT) ?
        action.payload : state;

const num = (state=null, action) => {
    switch (action.type) {
        case Action.ADD_NUM_TO_CALC:
            return action.payload
        case Action.REMOVE_NUM_FROM_CALC:
            let newNum = state.num;
            newNum.pop();
            return newNum;
        default:
            state
    }
}

const symbOnDis = (state="", action) =>
    (action.type === Action.SET_SYMBOL_ON_DISPLAY) ?
        action.payload : state;

const dotPresentInNum = (state=false, action) =>
    (action.type === Action.SET_DOT_IN_NUM) ?
        action.payload : state;

const currentHis = (state=[], action) => {

    switch (action.type) {

        case Action.ADD_TO_CURRENT_HISTORY :
            return Array(...state.currentHis, action.payload);

        case Action.CLEAR_LAST_INPUT :
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
        Array(...state.completeHis, action.payload) : state;

export default combineReducers({
    calcOpSelected,
    prevNum,
    num,
    symbOnDis,
    dotPresentInNum,
    currentHis,
    completeHis
})