import ACTIONS from './Constants.js'
/*
 * Action creators
 */
 
export const addNumToCalc = (numberClicked="") => (dispatch, getState) => {
    
    // convert the string to a positive number
    let numToAdd = Math.abs(parseFloat(numberClicked));
    
    // if numToAdd is a valid number
    if (numToAdd || numToAdd === 0) {

        if (numToAdd === 0 && getState().symbonDis === "0") {
            return {}; // essentially, do nothing
        } else {

            // dispatch action to set num
            dispatch({
                type: ACTIONS.ADD_NUM_TO_CALC,
                payload: [...getState().num, numberClicked]
            })

            // dispatch action to set the symbol on display to num
            dispatch(setSymbOnDis(getState().num))
        }

    } else {
        // throw an error
        console.error("addNumToCalc: Not a valid number provided. num: ", numberClicked);
        return {};
    }
    
} // addNumToCalc

export const addOpToCalc = (operator="none") => {
    // if operator is a valid string
    if (Object.prototype.toString.call(operator) === "[object String]") {
        return {
            type: ACTIONS.ADD_OPERATOR_TO_CALC,
            payload: operator
        }
    } else {
        console.error("addOpToCalc: Not a valid operator name provided. Operator: ", operator);
        return {};
    }
    
} // addOpToCalc

export const updatePrevNum = (numToUpdate=0) => {
    
    // if numToAdd is a valid number
    if (numToUpdate || numToUpdate === 0) {
        return {
            type: ACTIONS.CALC_PREVIOUS_RESULT,
            payload: numToUpdate
        }
    } else {
        console.error("updatePrevNum: Not a valid number provided. number: ", numToUpdate);
        return {};
    } 
    
} // updatePrevNum

export const setDotPresentInNum = (dotPresentInNum=false) => {
    // dotPresentInNum is a bool
    if(Object.prototype.toString.call(dotPresentInNum) === "[object Boolean]") {
        return {
            type: ACTIONS.SET_DOT_IN_NUM,
            payload: dotPresentInNum
        }
    } else {
        console.error("setDotPresentInNum: Not a valid input provided. Input: ", dotPresentInNum);
        return {};
    }
} // setDotPresentInNum

export const setSymbOnDis = (symbol="") => ({
    type: ACTIONS.SET_SYMBOL_ON_DISPLAY,
    payload: symbol
}) // setSymbOnDis

export const addToCurrentHis = (expression="") => ({
    type: ACTIONS.ADD_TO_CURRENT_HISTORY,
    payload: expression
}) // addToCurrentHis

export const updateCompleteHis = () => ({
    type: ACTIONS.UPDATE_TO_COMPLETE_HISTORY
}) // updateCompleteHis

export const removeLastFromCurrentHis = () => ({
    type: ACTIONS.REMOVE_LAST_FROM_CURRENT_HISTORY
}) // removeLastFromCurrentHis