import ACTIONS from './Constants.js'
/*
 * Action creators
 */
 
const addNumToCalc = (numberClicked=0) => {
    
    // convert the string to a positive number
    let numToAdd = Math.abs(parseFloat(numberClicked));
    
    // if numToAdd is a valid number
    if (numToAdd || numToAdd === 0) {
        return {
            type: ACTIONS.ADD_NUM_TO_CALC,
            payload: numToAdd
        }
    } else {
        // throw an error
        console.error("addNumToCalc: Not a valid number provided. num: ", numberClicked);
        return {};
    }
    
} // addNumToCalc

const addOpToCalc = (operator="none") => {
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

const updatePrevNum = (numToUpdate=0) => {
    
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

const setDotPresentInNum = (dotPresentInNum=false) => {
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