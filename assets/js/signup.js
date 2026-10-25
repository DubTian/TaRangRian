import { signUp, userSession, checkUsernameDb, checkEmailDb, authChange } from "./database.js";

const formSignUp = document.getElementById("signUp");
const username = document.getElementById("username");
const errorUsername = document.getElementById("errorUsername");
const email = document.getElementById("email");
const errorEmail = document.getElementById("errorEmail");
const password = document.getElementById("password");
const errorPassword = document.getElementById("errorPassword");
const passwordAgain = document.getElementById("passwordAgain");
const errorPasswordAgain = document.getElementById("errorPasswordAgain");
const submit = document.getElementById("submit");
const verifyPage = document.getElementById("verifyPage");
const otpAgain = document.getElementById("otpAgain");

const inputs = document.querySelectorAll("#signUp input");

const main = document.querySelector("main");
const header = document.querySelector("header");

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`)
};

const usernameCheck = async (username) => {
    if(username.value.length>=4 && username.value.length<=12 && await checkUsernameDb(username)) {
        errorUsername.style.display = "none"
        username.classList.remove("error-input");
        return true;
    } else if(username.value === "") {
        errorUsername.textContent = "*กรุณากรอกชื่อบัญชี"
        errorUsername.style.display = "block"
        username.classList.add("error-input");
        return false;
    } else if(username.value.length<4 || username.value.length>12) {
        errorUsername.textContent = "*ชื่อบัญชีต้องมี 4-12 ตัวอักษร"
        errorUsername.style.display = "block"
        username.classList.add("error-input");
        return false;
    } else if(!(await checkUsernameDb(username))) {
        errorUsername.textContent = "*ชื่อบัญชีนี้ถูกใช้ไปแล้ว"
        errorUsername.style.display = "block"
        username.classList.add("error-input");
        return false;
    };
};
const emailCheck = async (email) => {
    if(email.value!=="" && email.checkValidity() && await checkEmailDb(email)) {
        errorEmail.style.display = "none";
        email.classList.remove("error-input");
        return true;
    } else if(email.value === "") {
        errorEmail.textContent = "*กรุณากรอกอีเมล"
        errorEmail.style.display = "block";
        email.classList.add("error-input");
        return false;
    } else if(!email.checkValidity()) {
        errorEmail.textContent = "*กรุณากรอกอีเมลที่ถูกต้อง";
        errorEmail.style.display = "block";
        email.classList.add("error-input");
        return false;
    } else if(!(await checkEmailDb(email))) {
        errorEmail.textContent = "*อีเมลนี้ถูกใช้ไปแล้ว";
        errorEmail.style.display = "block";
        email.classList.add("error-input");
        return false;
    }
};
const passwordCheck = (password) => {
    if(password.value.length>=8 && /[A-Z]/.test(password.value) && /[a-z]/.test(password.value) && /[0-9]/.test(password.value)) {
        errorPassword.style.display = "none";
        password.classList.remove("error-input");
        return true;
    } else if(password.value.length === 0) {
        errorPassword.textContent = "*กรุณากรอกรหัสผ่าน"
        errorPassword.style.display = "block";
        password.classList.add("error-input");
        return false;
    } else if(password.value.length<8) {
        errorPassword.textContent = "*รหัสผ่านต้องมีอย่างน้อย 8 ตัว"
        errorPassword.style.display = "block";
        password.classList.add("error-input");
        return false;
    } else if(!(/[A-Z]/.test(password.value)) || !(/[a-z]/.test(password.value)) || !(/\d/.test(password.value))) {
        errorPassword.textContent = "*กรุณากรอกรหัสผ่านโดยมีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข"
        errorPassword.style.display = "block";
        password.classList.add("error-input");
        return false;
    };
};
const passwordAgainCheck = (password, passwordAgain) => {
    if(passwordAgain.value!=="" && passwordAgain.value===password.value) {
        errorPasswordAgain.style.display = "none";
        passwordAgain.classList.remove("error-input");
        return true;
    } else if(passwordAgain.value==="") {
        errorPasswordAgain.textContent = "*กรุณากรอกรหัสผ่านอีกครั้ง"
        errorPasswordAgain.style.display = "block";
        passwordAgain.classList.add("error-input");
        return false;
    } else if(passwordAgain.value!==password.value) {
        errorPasswordAgain.textContent = "*กรุณากรอกรหัสผ่านที่เหมือนกัน"
        errorPasswordAgain.style.display = "block";
        passwordAgain.classList.add("error-input");
        return false;
    };
};

window.addEventListener("reload", headerHeight);
window.addEventListener("resize", headerHeight);

username.addEventListener("input", () => {
    username.value = username.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    usernameCheck(username);
});
email.addEventListener("input", () => {
    email.value = email.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    emailCheck(email);
});
password.addEventListener("input", () => {
    password.value = password.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    passwordCheck(password);
});
passwordAgain.addEventListener("input", () => {
    passwordAgain.value = passwordAgain.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    passwordAgainCheck(password, passwordAgain);
});

submit.addEventListener("click", async (e) => {
    e.preventDefault();

    const usernameChecked = await usernameCheck(username);
    const emailChecked = await emailCheck(email);
    const passwordChecked = passwordCheck(password);
    const passwordAgainChecked = passwordAgainCheck(password, passwordAgain);

    if(usernameChecked && emailChecked && passwordChecked && passwordAgainChecked) {
        main.style.animation = "2s loading linear infinite";
        if(await signUp(username, email, password)) {
            verifyPage.style.display = "flex";
        };
        main.style.animation = "";
    };
});

otpAgain.addEventListener("click", async (e) => {
    await signUp(username, email, password)
})

inputs.forEach((input, index) =>
    input.addEventListener("keydown", e => {
        if(e.key === "Enter") {
            if(input.value && (index < inputs.length-1)) {
                e.preventDefault();
                inputs[index+1].focus();
            };
        };
    })
);

authChange(async () => {
    if(await userSession()) {
        window.location.href = "../"
    };
})

headerHeight();