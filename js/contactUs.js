import { submitContantUsMessages } from "./funcs/shared.js";
const  btnSubmitContacUS  =  document.querySelector("#contactUs-btn")
btnSubmitContacUS.addEventListener("click"  ,  (e) => {
e.preventDefault()
submitContantUsMessages()
console.log(e);
    
})