const showSwal = (text, icon, confirmButtonText, callBack) => {
    Swal.fire({
        text,
        icon,
        confirmButtonText
    }).then((result) => {
        callBack(result)
    })

}


function saveInToLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}
function getFromLocalStorage(key) {
    return JSON.stringify(localStorage.getItem(key))
}

function getToken() {
    const userInfos = JSON.parse(localStorage.getItem("user"))
    return userInfos ? userInfos.Token : null
}

function isLogin() {
    const userInfos = localStorage.getItem("user")
    return userInfos ? true : false;

}

function geturlParam(key) {
    const urlParams = new URLSearchParams(window.location.search)
    // console.log(window.location.search);  //?cat:frontend
    return urlParams.get(key)


}

function searchInArray(array, searchProperty, searchValue) {

    let outPutArray = array.filter(item => item[searchProperty].includes(searchValue))

    return outPutArray
}

function paginatItems(array, itemsPerpage, paginatParentElement, currentPage) {

    paginatParentElement.innerHTML = ""
       let endIndex  = itemsPerpage *  currentPage  
       let startIndex  =  endIndex  - itemsPerpage
     let paginatedItems  =    array.slice(startIndex  ,  endIndex)
    let paginatedCount =  Math.ceil(array.length / itemsPerpage) 

    for (let i = 1; i < paginatedCount + 1; i++) {
    
        paginatParentElement.insertAdjacentHTML("beforeend",
            `
            <li class="courses-paganation__item  courses-paganation__item--active"><a href="" class="courses-paganation__link  ">${i}</a></li>            
            
            
            
            `)

    }
    return paginatedItems



}


export { showSwal, saveInToLocalStorage, getFromLocalStorage, getToken, isLogin, geturlParam, searchInArray, paginatItems } 