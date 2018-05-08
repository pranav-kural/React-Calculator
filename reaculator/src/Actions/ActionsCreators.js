import ACTIONS from './Constants.js'

/*
 * Action creators
 */
 
export const addNumToCalc = (numberClicked="") => (dispatch, getState) => {
    
    if (getState().symbOnDis === getCalcOpSybmol(getState().calcOpSelected) && getState().calcOpSelected !== "none") {
        // add the last operator to currentHis
        dispatch(
            addToCurrentHis(
                getCalcOpSybmol(getState().calcOpSelected)
            )
        )
    }
    
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
                payload: getState().num + numberClicked
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

export const addOpToCalc = (operator="none") => (dispatch, getState) => {

    // if operator is not a valid string
    if (Object.prototype.toString.call(operator) !== "[object String]") {
        console.error("addOpToCalc: Not a valid operator name provided. Operator: ", operator);
        return {};
    }

    if (Object.prototype.toString.call(parseFloat(getState().symbOnDis)) === "[object Number]") {

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
                    parseFloat(getState().num)
            )
        )

        
        // dispatch the action for symbOnDis
        dispatch(
            setSymbOnDis(
                getCalcOpSybmol(operator)
            )
        )
    
        // set calcOpSelected
        dispatch({
            type: ACTIONS.SET_CURRENT_CALC_OP,
            payload: operator
        })

        // update current history
        dispatch(
            addToCurrentHis(
                getState().num
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
        // dispatch the action for symbOnDis
        dispatch(
            setSymbOnDis(
                getCalcOpSybmol(operator)
            )
        )
    
        // set calcOpSelected
        dispatch({
            type: ACTIONS.SET_CURRENT_CALC_OP,
            payload: operator
        })
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

const getCalcOpSybmol = (operator) => {
    // select which symbol to set on display
    switch (operator) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "x";
        case "divide":
            return "÷";
        default:
            break;
    }
    
} // getCalcOpSybmol

export const updatePrevNum = (numToUpdate=0) => {
    
    // if numToAdd is a valid number
    if (numToUpdate || numToUpdate === 0) {
        return {
            type: ACTIONS.SET_PREV_NUM,
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
            payload: getState.num + "."
        })

        // update the display
        dispatch(
            setSymbOnDis(
                getState().num
            )
        )

        // set dotPresentInNum to false (to avoid additional dot's in the same number)
        dispatch(
            setDotPresentInNum(true)
        )
    }
} // addDotToNum

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

export const clearLastInput = () => (dispatch, getState) => {
    if (getState().symbOnDis === getState().num) {
        
        // remove last character from num
        dispatch({
            type: ACTIONS.SET_NUM,
            payload: getState().num.split('').slice(0, -1).join('')
        })
        
        if (getState().num) {
            
            // set num on display
            dispatch(setSymbOnDis(getState().num))
            
        } else {
            
            // set last symbol in currentHis (operator) on display
            dispatch(setSymbOnDis(getState().currentHis.slice(-1)[0]))

        }
        
    } else {
        
        // set num to the last number in currentHis
        dispatch({
            type: ACTIONS.SET_NUM,
            payload: getState().currentHis.slice(-1)[0]
        })
        
        // Set the num on display
        dispatch(setSymbOnDis(getState().num))
        
        // reset the calcOpSelected
        dispatch({
            type: ACTIONS.SET_CURRENT_CALC_OP,
            payload: "none"
        })
    }
    
    // remove last element from currentHis
    dispatch({
        type: ACTIONS.REMOVE_LAST_FROM_CURRENT_HISTORY
    })
    
} // clearLastInput

export const updateCompleteHis = () => ({
    type: ACTIONS.UPDATE_TO_COMPLETE_HISTORY
}) // updateCompleteHis

export const clearCurrentCalc = () => (dispatch, getState) => {
    
    // clear current history
    dispatch({
        type: ACTIONS.CLEAR_CURRENT_CALCULATION
    })
    
    // clear num
    dispatch({
        type: ACTIONS.CLEAR_NUM
    })
    
    // reset display
    dispatch(setSymbOnDis("0"))
    
    // clear prevNum
    dispatch({
        type: ACTIONS.SET_PREV_NUM,
        payload: ""
    })
    // reset calcOpSelected
    dispatch({
        type: ACTIONS.SET_CURRENT_CALC_OP,
        payload: "none"
    })
    
    // reset dotPresentInNum
    dispatch(setDotPresentInNum(false))
    
} // clearCurrentCalc

export const calcResult = () => (dispatch, getState) => {
    
    // calc final result
    let finalResult = 
    (getState().symbOnDis !== getState().num) ? 
        getState().prevNum : 
        getCalculationResult(
                getState().calcOpSelected,
                getState().num,
                getState().prevNum
        );
    
    // display the result
    dispatch(setSymbOnDis(finalResult))
        
    // update complete history
    dispatch({
        type: ACTIONS.ADD_TO_COMPLETE_HISTORY,
        payload: [...getState().currentHis, "=", finalResult]
    })
    
    // clear current history
    dispatch({
        type: ACTIONS.CLEAR_CURRENT_CALCULATION
    })
    
    // clear num
    dispatch({
        type: ACTIONS.CLEAR_NUM
    })
    
    // clear prevNum
    dispatch({
        type: ACTIONS.SET_PREV_NUM,
        payload: ""
    })
    
    // reset calcOpSelected
    dispatch({
        type: ACTIONS.SET_CURRENT_CALC_OP,
        payload: "none"
    })
    
    // reset dotPresentInNum
    dispatch(setDotPresentInNum(false))
} // calcResult