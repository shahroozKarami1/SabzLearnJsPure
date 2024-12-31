import { getMe } from "./auth.js"
import { isLogin, geturlParam, getToken, showSwal } from "./utils.js"


const showUsreNameInNavbar = () => {
    const isUserLogin = isLogin()
    const navbarProfileBox = document.querySelector(".main-header__profile")
    if (isUserLogin) {
        getMe().then((data) => {
            navbarProfileBox.setAttribute("href", "/index.html")
            navbarProfileBox.innerHTML = `<span class="main-header_profile-text">${data.name}</span>`


        })

    } else {
        navbarProfileBox.setAttribute("href", "/login.html")
        navbarProfileBox.innerHTML = `<span class="main-header_profile-text">ثبت نام /  ورود </span>`
    }
}

const renderTopBarMenus = async () => {
    const toBarMenuItems = document.querySelector(".top-bar__menu")
    const res = await fetch("http://localhost:4000/v1/menus/topbar")
    let data = await res.json();
    toBarMenuItems.innerHTML = "";

    let shuffledArray = data.sort((a, b) => 0.5 - Math.random())


    shuffledArray.splice(0, 6).map((newData) => {
        toBarMenuItems.innerHTML += `
    <li class="tob-bar__item">
    <a href="#" class="top-bar__link">${newData.title}</a>
</li>
    `
    })

}

const getAndShowAllCourses = async () => {
    const coursesContainer = document.getElementById("courses-container")
    const getDataCourses = await fetch('http://localhost:4000/v1/courses')
    const data = await getDataCourses.json();
    data.splice(0, 6).map((singleCourse) => {
        coursesContainer.insertAdjacentHTML("beforeend", `

    <div class="col-lg-4">
    <div class="course-box">
        <a href="course.html?name=${singleCourse.shortName}">
            <img src=http://localhost:4000/courses/covers/${singleCourse.cover} alt="course-1" class="course-box__img">
        </a>
        <div class="course-box__main">
            <a href="course.html?name=${singleCourse.shortName}" class="course-box__title">${singleCourse.name}</a>
            <div class="course-box__raiting-teacher">
                <div class="course-box__teacher">
                    <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                    <a href="#" class="course-box__teacher-link">${singleCourse.creator}</a>
                </div>
                <div class="course-box__reating">
                ${Array(5 - singleCourse.courseAverageScore)
                .fill(0)
                .map(
                    (score) =>
                        `                        <i class=" fa-regular  fa-star  course-box__reating-icon  "></i>
      `                        ).join(" ")
            }
                
                ${Array(singleCourse.courseAverageScore)
                .fill(0)
                .map(
                    (score) =>
                        `<i class="fas  fa-star"></i>`
                ).join(" ")
            }

                </div>
            </div>

            <div class="course-box__status">
                <div class="course-box__users">
                    <i class="fas fa-users   course-box__users-link"></i>
                    <span href="#" class="course-box__user-text">${singleCourse.registers}</span>
                </div>
                <span class="course-box__users-price">${singleCourse.price === 0 ? "رایگان " : singleCourse.price.toLocaleString()}</span>

            </div>
            <div class="course-box__footer">
                <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                    <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                </a>

            </div>

        </div>
    </div>
</div>
    `

        )
    })

}

const getAndShowPapularCourses = async () => {
    const popularSectionBox = document.querySelector("#container-popular")
    const respons = await fetch("http://localhost:4000/v1/courses/popular")
    const resultData = await respons.json()
    console.log(popularSectionBox);
    resultData.forEach((mainData) => {

        popularSectionBox.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide">
        <div class="course-box">
            <a href="#">
                <img src="/images/courses/img5.png" alt="course-1" class="course-box__img">
            </a>
            <div class="course-box__main">
                <a href="#" class="course-box__title">دوره مصور سازی با پایتون </a>
                <div class="course-box__raiting-teacher">
                    <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">رضا دولتی</a>
                    </div>
                    <div class="course-box__reating">
                        <i class="fas  fa-star-half-alt   course-box__reating-icon  "></i>
                        <i class="fas  fa-star"></i>
                        <i class="fas  fa-star"></i>
                        <i class="fas  fa-star"></i>
                        <i class="fas  fa-star"></i>

                    </div>
                </div>

                <div class="course-box__status">
                    <div class="course-box__users">
                        <i class="fas fa-users   course-box__users-link"></i>
                        <span href="#" class="course-box__user-text">1055</span>
                    </div>
                    <span class="course-box__users-price">1,000,000</span>

                </div>
                <div class="course-box__footer">
                    <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                        <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                    </a>

                </div>

            </div>
        </div>
    </div>


`)



    })

}

const getAndShowPresellCourses = async () => {
    const presellContainer = document.querySelector("#presell-container")
    const respons = await fetch("http://localhost:4000/v1/courses/presell")
    const data = await respons.json()
    data.forEach(mainData => {
        presellContainer.insertAdjacentHTML("beforeend", `
     <div class="swiper-slide">
     <div class="course-box">
         <a href="#">
             <img src="/images/courses/img5.png" alt="course-1" class="course-box__img">
         </a>
         <div class="course-box__main">
             <a href="#" class="course-box__title">دوره مصور سازی با پایتون </a>
             <div class="course-box__raiting-teacher">
                 <div class="course-box__teacher">
                     <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                     <a href="#" class="course-box__teacher-link">رضا دولتی</a>
                 </div>
                 <div class="course-box__reating">
                     <i class="fas  fa-star-half-alt   course-box__reating-icon  "></i>
                     <i class="fas  fa-star"></i>
                     <i class="fas  fa-star"></i>
                     <i class="fas  fa-star"></i>
                     <i class="fas  fa-star"></i>

                 </div>
             </div>

             <div class="course-box__status">
                 <div class="course-box__users">
                     <i class="fas fa-users   course-box__users-link"></i>
                     <span href="#" class="course-box__user-text">1055</span>
                 </div>
                 <span class="course-box__users-price">1,000,000</span>

             </div>
             <div class="course-box__footer">
                 <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                     <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                 </a>

             </div>

         </div>
     </div>
 </div>


     `)
    })

}

const getAndShowArticles = async () => {


    const containerArticles = document.querySelector("#container-art")
    const respons = await fetch("http://localhost:4000/v1/articles")
    const data = await respons.json()

    data.slice(0, 6).map((maindata) => {

        containerArticles.insertAdjacentHTML("beforeend", `
        <div class="col-lg-4">

        <div class="articles-card__warppear">
            <div class="articles-card__header">
                <a href="#" class="articles-card__link-img"><img src=http://localhost:4000/courses/covers/${maindata.cover}
                        alt="artcale-logo"></a>
            </div>
            <div class="articles-card__content">
                <a href="" class="articles-card__content-link">${maindata.title}</a>
                <p class="articles-card__content-text">${maindata.description}</p>
                <a href="" class="articles-card__content-btn">بیشتر بخوانید...</a>
            </div>
        </div>

    </div>
        
        `)
    })

}

const getAndShowNavBarMenus = async () => {
    const menuContainer = document.querySelector("#menus-warpper")
    console.log(menuContainer);
    const response = await fetch("http://localhost:4000/v1/menus")
    const data = await response.json()
    data.forEach((maindata) => {
        menuContainer.insertAdjacentHTML("beforeend", `

        <li class="main-header__item">
        <a href=category.html?cat=${maindata.href} class="main-header__link"> ${maindata.title}
            ${maindata.submenus.length != 0 ?
                `
                <i class="fas fa-angle-down   main-header__icon"></i>
                <ul class="main-header__dropdown">
         ${maindata.submenus.map((listSub) => (
                    `      <li class="main-header__dropdown-item">
                <a href="" class="main-header__dropdown-link">${listSub.title}</a>
            </li>
`
                )).join("")

                }
  
                </ul>`
                : " "
            }

        </a>
    </li>
        
        
        
        `)
    })
    console.log(menuContainer);
}

const getAndShowCategoryCourses = async () => {


    const categoryName = geturlParam("cat")
    console.log(categoryName);
    const catContainer = document.querySelector("#cat-container")
    const response = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const data = await response.json()
    if (data.length) {
        data.map((maindata) => {
            catContainer.insertAdjacentHTML("beforeend", `
        
        <div class="col-lg-4">
        <div class="course-box">
            <a href="#">
                <img src=http://localhost:4000/courses/covers/${maindata.cover} alt="course-1" class="course-box__img">
            </a>
            <div class="course-box__main">
                <a href="#" class="course-box__title">${maindata.name}</a>
                <div class="course-box__raiting-teacher">
                    <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link"> ${maindata.creator}</a>
                    </div>
                    <div class="course-box__reating">
                    ${Array(5 - maindata.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class=" fa-regular  fa-star  course-box__reating-icon  "></i>`
                    ).join(" ")
                }   


                    ${Array(maindata.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class="fas  fa-star"></i>`

                    ).join(" ")



                }

                    </div>
                </div>

                <div class="course-box__status">
                    <div class="course-box__users">
                        <i class="fas fa-users   course-box__users-link"></i>
                        <span href="#" class="course-box__user-text">${maindata.registers}</span>
                    </div>
                    <span class="course-box__users-price">${maindata.price === 0 ? "رایگان" : maindata.price.toLocaleString()}</span>

                </div>
                <div class="course-box__footer">
                    <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                        <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                    </a>

                </div>

            </div>
        </div>
    </div>
        
        
        `)


        })

    } else {
        catContainer.insertAdjacentHTML("beforeend", `
        
        
        <div  class = "alert  alert-danger">هیچ دوره ایی برای این دسته بندی ثبت نشده است </div>
        
        `)
    }

    return data

}

const coursesSorting = (array, filterMethode) => {
    let outputArray = []
    switch (filterMethode) {
        case "free": {

            outputArray = array.filter(course => course.price === 0)
            break;
        }
        case "defualt": {
            outputArray = array

            break;
        }
        case "first": {
            outputArray = [...array].reverse()

            break;
        }
        case "last": {
            outputArray = array

            break;
        }
        case "love": {
            outputArray = array

            break;
        }

        default: {

            outputArray = array
        }


    }
    return outputArray

}
const insertHtmlTemplate = (data, showType, parentElement) => {

    if (showType === "row") {
        data.map((data) => {

            parentElement.insertAdjacentHTML("beforeend", `
    
                <div class="col-lg-4">
                <div class="course-box">
                    <a href="#">
                        <img src=http://localhost:4000/courses/covers/${data.cover} alt="course-1" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href="#" class="course-box__title">${data.name}</a>
                        <div class="course-box__raiting-teacher">
                            <div class="course-box__teacher">
                                <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                                <a href="#" class="course-box__teacher-link"> ${data.creator}</a>
                            </div>
                            <div class="course-box__reating">
                            ${Array(5 - data.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class=" fa-regular  fa-star  course-box__reating-icon  "></i>`
                    ).join(" ")
                }   
    
    
                            ${Array(data.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class="fas  fa-star"></i>`

                    ).join(" ")



                }
    
                            </div>
                        </div>
    
                        <div class="course-box__status">
                            <div class="course-box__users">
                                <i class="fas fa-users   course-box__users-link"></i>
                                <span href="#" class="course-box__user-text">${data.registers}</span>
                            </div>
                            <span class="course-box__users-price">${data.price === 0 ? "رایگان" : data.price.toLocaleString()}</span>
    
                        </div>
                        <div class="course-box__footer">
                            <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                                <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                            </a>
    
                        </div>
    
                    </div>
                </div>
            </div>
    
    
                `)

        }

        )



    } else {

        data.map((data) => {
            // console.log(data);
            parentElement.insertAdjacentHTML("beforeend", `
            <div class="col-12">
            <div class="course-box">
                <div class="course__box-header">
                    <div class="course__box-right">
                        <a class="course__box-right-link" href="#">
                            <img src=http://localhost:4000/courses/covers/${data.cover} class="course__box-right-img">
                        </a>
                    </div>
                    <div class="course__box-left">
                        <div class="course__box-left-top">
                            <a href="#" class="course__box-left-link">${data.name}</a>
                        </div>
                        <div class="course__box-left-center">
                            <div class="course__box-left-teacher">
                                <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                <span class="course__box-left-name">${data.creator}</span>
                            </div>
                            <div class="course__box-left-stars">
                            ${Array(5 - data.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class=" fa-regular  fa-star  course-box__reating-icon  "></i>`
                    ).join(" ")
                }   
                
                
                                        ${Array(data.courseAverageScore)
                    .fill()
                    .map(() =>
                        `<i class="fas  fa-star"></i>`

                    ).join(" ")



                }
                        </div>
                        <div class="course__box-left-bottom">
                            <div class="course__box-left-des">
                                <p>${data.description}</p>
                            </div>
                        </div>
                        <div class="course__box-footer">
                            <div class="course__box-footer-right">
                                <i class="course__box-footer-icon fa fa-users"></i>
                                <span class="course__box-footer-count">${data.registers}</span>
                            </div>
                            <span class="course__box-footer-left">${data.price === 0 ? "رایگان" : data.price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            
            
            `)

        })

    }

}

const getCourseDetails = () => {

    // get element 
    const $ = document
    const courseTitleElement = $.querySelector(".course-info__title")
    const courseTextElement = $.querySelector(".course-info__desc")
    const courseLinkCategoryElement = $.querySelector(".course-info__grouping")
    const courseBoxRegester = $.querySelector(".course-info__regester-title")
    const courseStatusElem = $.querySelector(".course-boxes__box-left-subtitle")
    const courseStatusSuppourtElement = $.querySelector(".course-boxes__box-left-subtitle-conection")
    const courseDataUpdate = $.querySelector(".course-boxes__box-left-subtitle-update")
    const courseStatisticView = $.querySelector(".course-info__statistics-commant-text")
    const courseStudentsCountElement = $.querySelector(".course-info__statistics-sale-count")
    const sessionsWrapper = $.querySelector(".sessions-wrapper ")

    const getterUrlParams = geturlParam('name')   //value query params ... ?  
    fetch(`http://localhost:4000/v1/courses/${getterUrlParams}`)
        .then(res => res.json())
        .then(data => {
            courseTitleElement.innerHTML = data.name
            courseTextElement.innerHTML = data.description
            courseLinkCategoryElement.innerHTML = data.categoryID.title
            courseBoxRegester.insertAdjacentHTML("beforeend",

                data.isUserRegisteredToThisCourse ? "دانشجوی دوره هستید ..." : "ثبت نام در دوره ..."

            )
            courseStatusElem.innerHTML = data.isComplete ? "تکمیل شده" : "در حال برگذاری"
            courseStatusSuppourtElement.innerHTML = data.support
            courseDataUpdate.innerHTML = data.updatedAt.slice(0, 10);
            courseStatisticView.innerHTML = `${data.comments.length}  :   دیدگاه`;
            courseStudentsCountElement.innerHTML = data.courseStudentsCount

            // show course  sessions
            if (data.sessions.length) {
                data.sessions.forEach((singleSession, index) => {

                    sessionsWrapper.insertAdjacentHTML("beforeend", `
                    <div class="accordion-body   course-introduction__accordion-body ">
                    <div class=" course-introduction__accordion-right">
                        <span class=" course-introduction__accordion-count">${index + 1}</span>
                        <i
                            class="fab  fa-youtube   course-introduction__accordion-icon"></i>
                            ${(singleSession.free || data.isUserRegisteredToThisCourse) ?
                            `
                                <a href="episode.html?name=${data.shortName}&id=${singleSession._id}" class=" course-introduction__accordion-link">${singleSession.title} </a>
                                
                                ` : `                                <span   class=" course-introduction__accordion-link">${singleSession.title} </span>
                                `
                        }
                    </div>
                   <div class=" course-introduction__accordion-left">
                        <span class=" course-introduction__accordion-time">${singleSession.time}</span>
                        ${!(singleSession.free || data.isUserRegisteredToThisCourse) ?
                            `<i  class="fa fa-lock"></i>`

                            : ""

                        }
                    </div>
                </div>`


                    )
                }

                )

            }
            else {
                sessionsWrapper.insertAdjacentHTML("beforeend", `
        <div class="accordion-body   course-introduction__accordion-body ">
        <div class=" course-introduction__accordion-right">
            <span class=" course-introduction__accordion-count">--</span>
            <i
                class="fab  fa-youtube   course-introduction__accordion-icon"></i>
            <a href="" class=" course-introduction__accordion-link">هنوز جلسه ایی آپلود نشده است </a>
        </div>
        <div class=" course-introduction__accordion-left">
            <span class=" course-introduction__accordion-time">00 : 00</span>
        </div>
    </div>
        
        
        
        `)

            }
            if (data.comments.length) {
                const wrapperCommentsElements = document.getElementById("wrapperCommentsElements")
                data.comments.forEach((mainData) => {

                    wrapperCommentsElements.insertAdjacentHTML("beforeend", `
                    <div class="comments__item">
                    <div class="comments__question">
                        <div class="comments__question-header">
                            <div class="comments__question-header-right">
                                <span class="comments__question-name comment-name"> ${mainData.creator.name}</span>
                                <span class="comments__question-status comment-status"> ${mainData.creator.role === "USER" ? "(دانشجو)" : "(مدرس)  "}</span>
                                <span class="comments__question-date comment-date">${mainData.createdAt.slice(0, 10)}</span>
                            </div>
                            <div class="comments__question-header-left">
                                <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                            </div>
                        </div>
                        <div class="comments__question-text">
                         
                            <p class="comments__question-paragraph comment-paragraph">
                                    ${mainData.body}
                       </p>
                           
                        </div>
                    </div>
    
                    ${mainData.answerContent ?
                            `      <div class="comments__ansewr">
                        <div class="comments__ansewr-header">
                            <div class="comments__ansewr-header-right">
                                <span class="comments__ansewr-name comment-name">${mainData.answerContent.creator.name}</span>
                                <span class="comments__ansewr-staus comment-status"> ${mainData.answerContent.creator.role === "ADMIN" ? "(مدرس)" : "(دانشجو)  "}</span>
                                <span class="comments__ansewr-date comment-date">${mainData.answerContent.createdAt.slice(0, 10)}</span>
                            </div>
                            <div class="comments__ansewr-header-left">
                                <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                            </div>
                        </div>
                        <div class="comments__ansewr-text">
                            <p class="comments__ansewr-paragraph comment-paragraph"> ${mainData.answerContent.body}</p>
                           
                        </div>
                    </div>
                    </div>`
                            : ``
                        }
              
                    
                    
                    
                    `


                    )

                })

            } else {
                wrapperCommentsElements.insertAdjacentHTML("beforeend", `
                <div  class = "alert  alert-danger">تاکنون هیچ کامنتی ثبت نشده است ... </div>
                `)
            }

        })
};


const getRelatedCourses = async () => {
    const getterUrlParams = geturlParam("name")
    const containerRelatedCourseElem = document.querySelector("#container-ralated-courses")
    const fetchingData = await fetch(`http://localhost:4000/v1/courses/related/${getterUrlParams}`)
    const data = await fetchingData.json()

    if (data.length) {
        data.forEach((maindata) => {
            containerRelatedCourseElem.insertAdjacentHTML("beforeend", `
            <li  class="course-info__related-item">
            <img   class="course-info__related-poster"  src="http://localhost:4000/courses/covers/${maindata.cover}" alt="">
            <a href="course.html?name=${maindata.shortName}"  class="course-info__related-link"> ${maindata.name} </a>
        </li>
            
            
            
            
            `)
        })

    } else {



    }




}


const getSessions = async () => {
    const containerVideoElement = document.querySelector(".episode-content__video")
    const wrapperLiElement = document.querySelector("#sidebar-topics__list-id")
    const getNameParam = geturlParam("name")
    const getIDparam = geturlParam("id")
    const response = await fetch(`http://localhost:4000/v1/courses/${getNameParam}/${getIDparam}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const data = await response.json()
    data.sessions.forEach((mainData) => {
        console.log(mainData);
        wrapperLiElement.insertAdjacentHTML("beforeend",

            ` <li class="sidebar-topics__list-item">
        <div class="sidebar-topics__list-right">
          <i
            class="sidebar-topics__list-item-icon fa fa-play-circle" >
            sidebar-topics__list-item-link
          </i>

          ${mainData.free ? `
            
            <a class="sidebar-topics__list-item-link" href="episode.html?name=${getNameParam}&id=${mainData._id}" > ${mainData.title}</a>
            ` : `
            <span class="sidebar-topics__list-item-link" > ${mainData.title}</span
            
            `
            }
 
        >
        </div>
        <div class="sidebar-topics__list-left">
          <span class="sidebar-topics__list-item-time">${mainData.time}</span>
          
          ${(!mainData.free) ? `
            
            <i  class="fa fa-lock  lockIconStyle"></i>

            ` : `
                       
            `
            }
        </div>
      </li>`




        )
        containerVideoElement.setAttribute("src", `http://localhost:4000/courses/covers/${mainData.video}`)
    })
}


const submitContantUsMessages = async () => {
    const fullNameInpElem = document.querySelector("#name")
    const emailInpElem = document.querySelector("#email")
    const phoneInpElem = document.querySelector("#phone")
    const mainTextInpElem = document.querySelector("#body")
    let newContactUsInfos = {

        name: fullNameInpElem.value.trim(),
        email: emailInpElem.value.trim(),
        phone: phoneInpElem.value.trim(),
        body: mainTextInpElem.value.trim()
    }
    const res = await fetch("http://localhost:4000/v1/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContactUsInfos)
    })
    const result = await res.json()

    if (res.status === 201) {

        Swal.fire({
            text: 'thanks for Comment.. :)!',
            icon: 'success',
            confirmButtonText: 'good'
        }).then(() => {
            location.href = "index.html"
        })

    } else {
        Swal.fire({
            icon: 'error',
            text: ' Edit and  try again ...  ',
            confirmButtonText: 'edit'
        })

    }


}

const createNewNewsLettter = async () => {
    const inpNewsLetterElement = document.querySelector("#inpNewsletter")

    const newNewsLetterEmail = {
        email: inpNewsLetterElement.value.trim()
    }
    const res = await fetch(`http://localhost:4000/v1/newsletters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNewsLetterEmail)
    })

    const result = await res.json()
    if (res.ok) {
        showSwal("ایمیل شما با موفقیت ثبت شد", "success", "good", () => { })
    } else {
        showSwal(" مجددا ایمیل خود را وارد کنید ", "error", "Edit", () => { })

    }


}


const globalSearch = async () => {
    const wrapperCoursesResult = document.getElementById("courses-container")
    const wrapperArticaleResult = document.getElementById("articles-wrapper")
    const searchValue = geturlParam("value")
    const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`)
    const result = await res.json()

    if (result.allResultCourses.length) {
        result.allResultCourses.forEach((mainData) => {
            console.log(mainData);
            wrapperCoursesResult.insertAdjacentHTML("beforeend", `
       <div class="col-lg-4">
       <div class="course-box">
           <a href="course.html?name=${mainData.shortName}">
               <img src=http://localhost:4000/courses/covers/${mainData.cover} alt="course-1" class="course-box__img">
           </a>
           <div class="course-box__main">
               <a href="course.html?name=${mainData.shortName}" class="course-box__title">${mainData.name}</a>
               <div class="course-box__raiting-teacher">
                   <div class="course-box__teacher">
                       <i class="fas fa-chalkboard-teacher  course-box__teacher-icon"></i>
                       <a href="#" class="course-box__teacher-link">آقای سعیدی راد</a>
                   </div>
    
               </div>
    
               <div class="course-box__status">
                   <div class="course-box__users">
                       <i class="fas fa-users   course-box__users-link"></i>
                       <span href="#" class="course-box__user-text">150</span>
                   </div>
                   <span class="course-box__users-price">${mainData.price === 0 ? "رایگان " : mainData.price.toLocaleString()}</span>
    
               </div>
               <div class="course-box__footer">
                   <a href="" class="course-box__fotter-link">مشاهده اطلاعات
                       <i class="fas fa-arrow-left   course-box__fotter-icon"></i>
                   </a>
    
               </div>
    
           </div>
       </div>
    </div>
       `


            )

        })

    } else {
        wrapperCoursesResult.insertAdjacentHTML("beforeend",

            `<div  class="alert alert-danger">دوره ایی مطابق با سرچ شما پیدا نشد ...</div>`


        )
    }

    if (result.allResultArticles.length) {
        result.allResultArticles.forEach((mainData) => {
            wrapperArticaleResult.insertAdjacentHTML("beforeend", `
        <div class="col-lg-4">
     
        <div class="articles-card__warppear">
            <div class="articles-card__header">
                <a href="#" class="articles-card__link-img"><img src=http://localhost:4000/courses/covers/${mainData.cover}
                        alt="artcale-logo"></a>
            </div>
            <div class="articles-card__content">
                <a href="" class="articles-card__content-link">${mainData.title}</a>
                <p class="articles-card__content-text">${mainData.description}</p>
                <a href="" class="articles-card__content-btn">بیشتر بخوانید...</a>
            </div>
        </div>
     
     </div>
        
        
        
        
        `)
        })


    } else {
        wrapperArticaleResult.insertAdjacentHTML("beforeend",

            `<div  class="alert alert-danger">مقاله ایی مطابق با سرچ شما پیدا نشد ...</div>`


        )
    }

}

const submitComments = async () => {
    const coommentTextAreaElement = document.querySelector("#bodyTextComment")
    const commentScoreElement = document.querySelector("#comment-score")
    let score = 5
    let courseShortName = geturlParam("name")
       commentScoreElement.addEventListener("change", event => score = event.target.value)
    const newCommentsInfo = {
        body : coommentTextAreaElement.value.trim(),
        courseShortName  ,  
        score
    }

    const res = await fetch(`http://localhost:4000/v1/comments`, {
        method: "POST",
        headers: {
            Authorization: `Bearar ${getToken()}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newCommentsInfo)

    }
    )
    if (res.ok) {
        showSwal("کامنت  شما با موفقیت ثبت شد", "success", "good", () => { })

    } else {
        showSwal(" مجددا کامنت  خود را وارد کنید ", "error", "Edit", () => { })

    }
    const data = await res.json()
    console.log(data);
}



export {
    showUsreNameInNavbar, renderTopBarMenus, getAndShowAllCourses, getAndShowPapularCourses, getAndShowPresellCourses, getAndShowArticles
    , getAndShowNavBarMenus, getAndShowCategoryCourses, insertHtmlTemplate, coursesSorting, getCourseDetails, getRelatedCourses, getSessions, submitContantUsMessages, createNewNewsLettter,
    globalSearch, submitComments
}