import { getCourseDetails, getRelatedCourses, submitComments } from "./funcs/shared.js";

window.addEventListener("load", () => {
    const submitBtnComments = document.querySelector("#submit_btn_coommnts")

    getCourseDetails()
    getRelatedCourses()
    submitBtnComments.addEventListener("click", (e) => {


        e.preventDefault()
        submitComments()

    })
})