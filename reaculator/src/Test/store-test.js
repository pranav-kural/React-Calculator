import storeFactory from '../Store'
import { addNumToCalc } from '../Actions/ActionsCreators';
import { addOpToCalc } from '../Actions/ActionsCreators';
import { clearLastInput } from '../Actions/ActionsCreators';
import { calcResult } from '../Actions/ActionsCreators';

/*
* Using the application flow example created in the application plan as base for testing
*/

// export the test
export default () => {
    
    alert("running")
    
    const store = storeFactory()
    
    let sd = store.dispatch;
    
    let l = console.log
    
    l("number 8 clicked")
    sd(addNumToCalc("8"))
    
    l("add button clicked")
    sd(addOpToCalc("add"))
    
    l("number 9 clicked")
    sd(addNumToCalc("9"))
    
    l("subtract button clicked")
    sd(addOpToCalc("subtract"))
    
    l("number 2 clicked")
    sd(addNumToCalc("2"))
    
    l("CE button clicked")
    sd(clearLastInput())
    
    l("number 7 clicked")
    sd(addNumToCalc("7"))
    
    l("multiply button clicked")
    sd(addOpToCalc("multiply"))
    
    l("number 4 clicked")
    sd(addNumToCalc("4"))
    
    l("Equal button clicked")
    sd(calcResult())
    
    return "Done";
    
}