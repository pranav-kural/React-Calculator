import React from 'react'
import Action from '../Actions/Constants'

const calcOpSelected = (state="none", action) =>
    (action.type === Action.ADD_OPERATOR_TO_CALC) ?
        action.payload : state;

const prevNum = (state=0, action) =>
    (action.type === Action.CALC_PREVIOUS_RESULT) ?
        parseFloat(action.payload) : state;

const num = (state=0, action) =>
    (action.type === Action.ADD_NUM_TO_CALC) ?
        parseFloat(action.payload) : state;

const symbOnDis = (state="", action) =>
    (action.type === Action.ADD_NUM_TO_CALC) ?
        action.payload : state;

const nextIsNum = (state=true, action) =>
    (action.type === Action.SET_NEXT_INPUT_TYPE_TO_NUM) ?
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

