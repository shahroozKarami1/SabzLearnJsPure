import { saveInToLocalStorage, showSwal     ,  getToken } from "./utils.js"


let $ = document

function regester() {
    let nameInp = $.getElementById("name")
    let userNameInp = $.getElementById("username")
    let emailInp = $.getElementById("email")
    let phoneInp = $.getElementById("phone")
    let passwordInp = $.getElementById("password")

    let newUserInfos = {

        name: nameInp.value.trim(),
        username: userNameInp.value.trim(),
        email: emailInp.value.trim(),
        phone: phoneInp.value.trim(),
        password: passwordInp.value.trim(),
        confirmPassword: passwordInp.value.trim()

    }
    fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfos)
    }).then(res => {
        console.log(res);
        if (res.status === 201) {

            showSwal('ورود موفقیت آمیز بود ', "success", "welcome", () => {
                location.href = "/index.html"
            })

        }
        else if (res.status === 409) {
            showSwal("خطانام کاربری یا ایمیل تکراری میباشد ", "error", "go to login page ", () => {
                location.href = "/login.html"
            })
        }
        else if (res.status === 400) {
            showSwal("پر کردن فیلد ها اجباری میباشد ", "warning", "Edit Form ", () => {
            })
        }
        return res.json()
    }).then((result) => {
        console.log(result);
        saveInToLocalStorage("user", { Token: result.accessToken })
    })



}
// love js  

function login() {
    let identifierInp = $.getElementById("login_username")
    let passwordInp = $.getElementById("login_password")
    let loginUserObj = {
        identifier: identifierInp.value.trim(),
        password: passwordInp.value.trim()
    }

    fetch("http://localhost:4000/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUserObj)
    }).then(res => {
        console.log(res);
        if (res.status === 401 || res.status === 400) {

            showSwal("کاربری با این اطلاعات یافت نشد", "error", "Edit information", () => { })

        } else {
            showSwal("ورود موفقیت آمیز بود ", "success", "welcome to panel", () => {
                location.href = "/index.html"
            })

        }
        return res.json()

    }).then((result) => {
        console.log(result);
        saveInToLocalStorage("user", { Token: result.accessToken })
    })
}


 async function  getMe () {

const    token  =  getToken()
if (!token) {
    return  false
}else{
     const  res  =  await   fetch("http://localhost:4000/v1/auth/me"  , {
        headers :  {
            "Authorization"  :   `Bearer ${token}`
        }
    })
    const data  = await  res.json()
    return  data
}
}


export { regester, login    ,  getMe }