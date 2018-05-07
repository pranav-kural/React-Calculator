import ACTIONS from './Constants.js'
/*
 * Action creators
 */
 
export const addNumToCalc = (numberClicked="") => (dispatch, getState) => {
    
    // convert the string to a positive number
    let numToAdd = Math.abs(parseFloat(numberClicked));
    
    // if numToAdd is a valid number
    if (numToAdd || numToAdd === 0) {

        if (numToAdd === 0 && getState().symbOnDis === "0") {
            return {}; // essentially, do nothing
        } else {

            // dispatch action to set num
            dispatch({
                type: ACTIONS.SET_NUM,
                payload: [...getState().num, numberClicked]
            })

            // dispatch action to set the symbol on display to num
            dispatch(setSymbOnDis(getState().num.join('')))
        }

    } else {
        // throw an error
        console.error("addNumToCalc: Not a valid number provided. num: ", numberClicked);
        return {};
    }
    
} // addNumToCalc

export const addOpToCalc = (operator="none") => (dispatch, getState) => {

    // if operator is not a valid string
    if (Object.prototype.toString.call(operator) !== "[object String]") {
        console.error("addOpToCalc: Not a valid operator name provided. Operator: ", operator);
        return {};
    }

    if (Object.prototype.toString.call(getState().symbOnDis) === "[object Number]") {

        // update prevNum
        dispatch(
            updatePrevNum(
                // if prevNum needs to be calucated
                (getState().calcOpSelected !== "none") ? 
                    // calculate prev num
                    getCalculationResult(
                        getState().calcOpSelected, 
                        getState().num, 
                        getState().prevNum
                    ) :
                    // else, set it to the current value of num
                    parseFloat(getState().num.join(''))
            )
        )

        // set calcOpSelected
        setCalcOpSelected(dispatch, operator)

        // update current history
        dispatch(
            addToCurrentHis(
                getState().num.join('')
            )
        )

        // clear the present num
        dispatch({
            type: ACTIONS.CLEAR_NUM
        })

        // Reset dotPresentInNum
        dispatch(
            setDotPresentInNum()
        )
    } else {
        // set calcOpSelected
        setCalcOpSelected(operator)
    }
    
} // addOpToCalc

const getCalculationResult = (operator, num, prevNum) => {

    let num1 = parseFloat(num)
    let num2 = parseFloat(prevNum)

    if((num1 || num1 === 0) && (num2 || num2 === 0)) {

        switch(operator) {

            case "add" :
                return num1 + num2;

            case "subtract": 
                return num2 - num1;

            case "divide":
                return num2 / num1;

            case "multiply":
                return num2 * num1;

            default:
                return num2;
        }

    } else {
        return num2;
    }

} // getCalculationResult

const setCalcOpSelected = (dispatch, operator) => {
    // set the operator clicked as symbol display
    let opSymbol
    // select which symbol to set on display
    switch (operator) {
        case "add":
            opSymbol = "+";
            break;
        case "subtract":
            opSymbol = "-";
            break;
        case "multiply":
            opSymbol = "x";
            break;
        case "divide":
            opSymbol = "÷";
            break;
        default:
            break;
    }
    // dispatch the action for symbOnDis
    dispatch(
        setSymbOnDis(
            opSymbol
        )
    )

    // set calcOpSelected
    dispatch({
        type: ACTIONS.ADD_OPERATOR_TO_CALC,
        payload: operator
    })
}

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

export const addDotToNum = () => (dispatch, getState) => {
    if (getState().dotPresentInNum !== true) {

        // add dot to num
        dispatch({
            type: ACTIONS.SET_NUM,
            payload: [...getState.num, "."]
        })

        // update the display
        dispatch(
            setSymbOnDis(
                getState().num.join('')
            )
        )

        // set dotPresentInNum to false (to avoid additional dot's in the same number)
        dispatch(
            setDotPresentInNum(true)
        )
    }
}

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