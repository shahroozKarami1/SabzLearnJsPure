import { showUsreNameInNavbar    ,  renderTopBarMenus  ,  createNewNewsLettter } from "./funcs/shared.js";
const  btnNewsLetterElement  =  document.querySelector("#btnNewsLetter")


window.addEventListener("load"  , () =>  {
  showUsreNameInNavbar()
  renderTopBarMenus()
  btnNewsLetterElement.addEventListener("click"  , (e) =>  {
  
    e.preventDefault()
    
  
    createNewNewsLettter()
})
})