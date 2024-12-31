import { regester } from "./funcs/auth.js";

const regsterBtn = document.getElementById("regester-btn")
regsterBtn.addEventListener("click", (e) => {
    e.preventDefault()
    regester()

})