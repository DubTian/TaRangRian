import { logOut, authChange, checkTeacherDb, verifyTeacherDb } from "./database.js";

const logOutNav = document.getElementById("logOutNav");
const userNav = document.getElementById("userNav");
const verifyPassword = document.getElementById("verifyPassword");
const errorVerifyPassword = document.getElementById("errorVerifyPassword");
const submit = document.getElementById("submit");

const header = document.querySelector("header");
const main = document.querySelector("main");

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`);
};

const checkUser = async (session) => {
    if(session===null || await checkTeacherDb()) {
        window.location.href = "../";
    } else {
        userNav.textContent = session.user.user_metadata.username;
    };
};

const checkVerifyTeacher = (verifyPassword) => {
    if(verifyPassword.value.length === 0) {
        errorVerifyPassword.textContent = "*กรุณากรอกรหัสยืนยันตัวตนครู"
        errorVerifyPassword.style.display = "block";
        verifyPassword.classList.add("error-input");
        return false;
    } else {
        errorVerifyPassword.style.display = "none";
        verifyPassword.classList.remove("error-input");
        return true;
    };
};

window.addEventListener("reload", headerHeight);
window.addEventListener("resize", headerHeight);

logOutNav.addEventListener("click", async (e) => {
    e.preventDefault();
    await logOut();
});

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if(checkVerifyTeacher(verifyPassword)) {
        main.style.animation = "2s loading linear infinite";
        if(!(await verifyTeacherDb(verifyPassword))) {
            errorVerifyPassword.textContent = "*รหัสยืนยันตัวตนครูไม่ถูกต้อง";
            errorVerifyPassword.style.display = "block";
            verifyPassword.classList.add("error-input");
        } else {
            window.location.href = "";
        };
        main.style.animation = "";
    };
});

headerHeight();
authChange((event, session) => checkUser(session));