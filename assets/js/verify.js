import { logOut, authChange, checkTeacherDb } from "./database.js";

const logOutNav = document.getElementById("logOutNav");
const userNav = document.getElementById("userNav");

const header = document.querySelector("header");

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`)
};

const checkUser = async (session) => {
    if(session === null || await checkTeacherDb()) {
        window.location.href = "../"
    } else {
        userNav.textContent = session.user.user_metadata.username;
    };
};

window.addEventListener("reload", headerHeight);
window.addEventListener("resize", headerHeight);

logOutNav.addEventListener("click", async (e) => {
    e.preventDefault();
    await logOut();
});

authChange((event, session) => checkUser(session));
headerHeight();