let initialState = {
    calcOpSelected: "sub", //calculation operator selected
    prevNum: 17, // if any number typed previously
    num: 2, // last pressed number digit
    symbOnDis: 2, //symbol on display,
    dotPresentInNum: false, // true is there is a dot present in the number being typed
    currentHis: [], //history of the ongoing calculation,
    completeHis: [], // history for the complete one user session
    errors: [] // store errors
}

