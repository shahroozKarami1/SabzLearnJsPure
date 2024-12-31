import { getAndShowCategoryCourses, insertHtmlTemplate, coursesSorting } from "./funcs/shared.js";
import { searchInArray, paginatItems } from "./funcs/utils.js";
window.addEventListener("load", () => {
    const catContainer = document.querySelector("#cat-container")
    getAndShowCategoryCourses().then((responsCourses) => {
        let courses = [...responsCourses];
        let coursesShowType = "row"
        const coursesShowTypeIcons = document.querySelectorAll(".coursesTopBarIcon-parent")
        coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
            coursesShowTypeIcon.addEventListener("click", (e) => {

                coursesShowTypeIcons.forEach((icon) => {
                    icon.classList.remove("courses-top-bar__icon--active")
                })
                e.target.classList.add("courses-top-bar__icon--active")

                if (String(e.target.className).includes("row")) {
                    coursesShowType = "row"
                    catContainer.innerHTML = "";
                    insertHtmlTemplate(courses, coursesShowType, catContainer)

                } else {
                    coursesShowType = "column"
                    catContainer.innerHTML = "";
                    insertHtmlTemplate(courses, coursesShowType, catContainer)




                }
            })
        })

        // start filtering sections   Good man  
        const courseFilteringSelections = document.querySelectorAll('.courses-top-bar__selection-item')
        const selectionTitleElem = document.querySelector(".courses-top-bar__selection-title")
        courseFilteringSelections.forEach((singleItem) => {
            singleItem.addEventListener("click", (e) => {

                courseFilteringSelections.forEach((singleCelection) => {
                    singleCelection.classList.remove("courses-top-bar__selection-item--active")
                })
                e.target.classList.add("courses-top-bar__selection-item--active")
                selectionTitleElem.innerHTML = ""
                selectionTitleElem.insertAdjacentHTML("beforeend", `
                    ${e.target.innerHTML}
                    <i class="fas fa-angle-down   courses-top-bar__selection-icon"></i>

                    
                    
                    
                    
                    `)
                let userFilteringSelection = e.target.dataset.key
                let showCourses = coursesSorting([...responsCourses], userFilteringSelection)  // outPut is array !!! 
                catContainer.innerHTML = ""
                insertHtmlTemplate(showCourses, coursesShowType, catContainer)
            })

        })
        // handling searchbox  ... ?  
        const searchBoxCourses = document.querySelector(".courses-top-bar__input")
        searchBoxCourses.addEventListener("input", ((e) => {
            catContainer.innerHTML = "";
            let searchBoxValue = e.target.value
            const showCourses = searchInArray([...responsCourses], "name", searchBoxValue)

            if (showCourses.length) {
                insertHtmlTemplate(showCourses, coursesShowType, catContainer)

            } else {
                catContainer.insertAdjacentHTML("beforeend", `
               
              <div  class = "alert  alert-danger">هیچ  دوره ایی برای جست و جوی شما وجود ندارد...</div>
               
               
               
               `)

            }
        }))
        // handel  Pagination 

        const coursePaginationWrapper = document.querySelector(".courses-paganation__list")
        const shownCourses = paginatItems([...responsCourses], 3, coursePaginationWrapper, 1)
        insertHtmlTemplate([...shownCourses], coursesShowType, catContainer)
    })




})


