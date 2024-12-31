import { getAndShowAllCourses   ,  getAndShowArticles,  getAndShowNavBarMenus,  getAndShowPapularCourses   ,  getAndShowPresellCourses  , globalSearch} from "./funcs/shared.js"

// config text writer ... 
const $ = document

const landingTitle = $.querySelector(".landing__title")
const landingCoursesCount = $.querySelector('#courses-count')
const landingUserCounter = $.querySelector('#user-counter')
const landingminutesCount = $.querySelector('#minutes-count')
const globalSearchBtn  =  $.querySelector("#search-btn")
const globalSearchInp  =  $.querySelector("#search-input")


window.addEventListener("load", () => {
    let landingText = "ما به هر قیمتی  دوره تولید نمیکنیم  ..."
    let textIndex = 0
    textWriter(landingText, textIndex)
    makeCounter(40, landingCoursesCount)
    makeCounter(3_120, landingUserCounter)
    makeCounter(7_000, landingminutesCount)
    getAndShowAllCourses()
    getAndShowPapularCourses()
    getAndShowPresellCourses()
    getAndShowNavBarMenus()

    getAndShowArticles()
    globalSearchBtn.addEventListener("click"  ,  (e) =>  {
        e.preventDefault()
        location.href  =  `search.html?value=${globalSearchInp.value.trim()}`
    })
})

const textWriter = (text, index) => {
    if (index < text.length) {
        landingTitle.innerHTML += text[index]
        index++

    }
    setTimeout(() => {
        // recursive functions   توابعی که درون خودش خودش فراخوانی میشه  
        textWriter(text, index)
    }, 100);

}

////////////////////////////////////////////////////
// count down timer  .... 


function  makeCounter (max  ,  element) {
    let counter = 0
    const inteval  = setInterval(() => {

        if(counter  === max){
            clearInterval(inteval)
        }
        element.innerHTML  =  counter
        counter++
    }, 0.5);

}


// ////////////////////////////////////////////dore js   


