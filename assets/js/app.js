import { logOut, userSession, authChange, classNormal  } from "./database.js";

const signUpNav = document.getElementById("signUpNav");
const logInNav = document.getElementById("logInNav");
const logOutNav = document.getElementById("logOutNav");
const userNav = document.getElementById("userNav");
const statusNav = document.getElementById("statusNav");
const year = document.getElementById("yearValue");
const month = document.getElementById("monthValue");
const yearBack = document.getElementById("yearBack");
const yearGo = document.getElementById("yearGo");
const monthBack = document.getElementById("monthBack");
const monthGo = document.getElementById("monthGo");
const cell = document.getElementById("cell");
const classDay = document.getElementById("classDay");

const dates = document.querySelectorAll(".date");
const mon = document.querySelectorAll(".mon");
const tue = document.querySelectorAll(".tue");
const wed = document.querySelectorAll(".wed");
const thu = document.querySelectorAll(".thu");
const fri = document.querySelectorAll(".fri");

const header = document.querySelector("header");

const cellTimes = Array.from({length:11}, (_, i) => document.getElementById(`cellTime${i+1}`));

const classes = Array.from({length:11}, (_, i) => {
    return{
        subject: document.getElementById(`class${i+1}-1`),
        teacher: document.getElementById(`class${i+1}-2`),
        room: document.getElementById(`class${i+1}-3`)
    };
});

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`);
};

const checkUser = async (user) => {
    if(user) {
        signUpNav.style.display = "none";
        logInNav.style.display = "none";
        logOutNav.style.display = "block";
        userNav.style.display = "block";
        userNav.textContent = user.user.user_metadata.username;
        statusNav.style.display = "block";
        if(user.user.user_metadata.teacher) {
            statusNav.src = "./assets/pictures/check.webp"
            statusNav.title = "ยืนยันสถานะครูแล้ว"
        } else {
            statusNav.src = "./assets/pictures/cross.webp"
            statusNav.title = "ยังไม่ได้ยืนยันสถานะครู"
        };

    } else {
        signUpNav.style.display = "block";
        logInNav.style.display = "block";
        logOutNav.style.display = "none";
        userNav.style.display = "none";
        statusNav.style.display = "none";
    };
};

const calendarCal = (monthCount, yearCount) => {
    let first = `${yearCount-543}-${monthCount+1}-${1}`;
    let last = `${yearCount-543}-${monthCount+1}-${lastDate(monthCount, yearCount-543)}`;
    let firstDay = new Date(first).getDay();
    let lastDay = new Date(last).getDay();
    let weekends = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41];

    dates[firstDay].textContent = 1;
    dates[firstDay].classList.remove("block-day", "out-month");

    for(let i = 2; i<=lastDate(monthCount, yearCount-543); i++) {
        dates[firstDay+i-1].textContent = i;
        dates[firstDay+i-1].classList.remove("block-day", "out-month");
    };

    for(let i = 0; firstDay-i-1>=0; i++) {
        dates[firstDay-i-1].textContent = lastDate((monthCount-1+monthNames.length) % monthNames.length, yearCount-543)-i;
        dates[firstDay-i-1].classList.add("out-month");
    };

    if(lastDate(monthCount, yearCount-543)===28 && firstDay===0) {
        for(let i = 1; i<=7; i++) {
            dates[i+27].textContent = i;
            dates[i+27].classList.add("out-month");
        };
        for(let i = 1; i<=7; i++) {
            dates[i+34].textContent = i+13-lastDay;
            dates[i+34].classList.add("out-month");
        };
    } else if(firstDay===6 && lastDate(monthCount, yearCount-543)===29) {
        for(let i = 1; i<=7; i++) {
            dates[i+34].textContent = i;
            dates[i+34].classList.add("out-month");
        };
    } else if((lastDate(monthCount, yearCount-543)>=30 && firstDay>=5)) {
        for(let i = 1; lastDay+i<=6; i++) {
            dates[lastDay+i+35].textContent = i;
            dates[lastDay+i+35].classList.add("out-month");
        };
    } else if(lastDay===6){
        for(let i = 1; i<=7; i++) {
            dates[i+34].textContent = i;
            dates[i+34].classList.add("out-month");
        };
    } else {
        for(let i = 1; lastDay+i<=6; i++) {
            dates[lastDay+i+28].textContent = i;
            dates[lastDay+i+28].classList.add("out-month");
        };
        for(let i = 1; i<=7; i++) {
            dates[i+34].textContent = i+6-lastDay;
            dates[i+34].classList.add("out-month");
        };
    };

    weekends.forEach(weekend => dates[weekend].classList.add("block-day"));
};

const lastDate = (mv, yv) => {
    let kom = [0, 2, 4, 6, 7, 9, 11];
    let yon = [3, 5, 8, 10];

    if(kom.includes(mv)){
        return(31)
    } else if(yon.includes(mv)) {
        return(30)
    } else {
        if((yv%4 === 0 && yv%100 !== 0) || year%400 === 0){
            return(29)
        } else {
            return(28)
        };
    };
};

const classLoad = async (dayTh, day) => {
    for(const classesJr of classes) {
        classesJr.subject.innerHTML = "&nbsp;";
        classesJr.teacher.innerHTML = "กำลังโหลด...";
        classesJr.room.innerHTML = "&nbsp;";
    };

    classDay.textContent = dayTh;

    if(result[day]) {
        for(const [i, classesJr] of classes.entries()) {
            classesJr.subject.innerHTML = result[day].class[i].subject;
            classesJr.teacher.innerHTML = result[day].class[i].teacher;
            classesJr.room.innerHTML = result[day].class[i].room;
        };
    } else {
        for(const classesJr of classes) {
            classesJr.subject.innerHTML = "&nbsp;";
            classesJr.teacher.innerHTML = "ไม่มีข้อมูล";
            classesJr.room.innerHTML = "&nbsp;";
        };
    };
};

const termCheck = (mv, yv) => {
    if(mv>=4 && mv<=8) {
        return(`${yv}-1`)
    } else if(mv>=9) {
        return(`${yv}-2`)
    } else {
        return(`${yv-1}-2`)
    }
};

const termChange = async (mv, yv) => {
    if(term !== termCheck(mv, yv)) {
        term = termCheck(mv, yv);
        result = await classNormal(term);
        console.log("load", term)
    };
}

const user = await userSession();

let yearCount = new Date().getFullYear()+543;
year.textContent = yearCount;

let monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
];
let monthCount = new Date().getMonth();
month.textContent = monthNames[monthCount];

window.addEventListener("reload", headerHeight);
window.addEventListener("resize", headerHeight);

logOutNav.addEventListener("click", async (e) => {
    e.preventDefault();
    await logOut();
});

yearBack.addEventListener("click", async () => {
    if(yearCount===2490) {
        yearCount = new Date().getFullYear()+544;
    } else {
        yearCount--;
    };
    year.textContent = yearCount;
    await termChange(monthCount, yearCount);
    calendarCal(monthCount, yearCount);
});
yearGo.addEventListener("click", async () => {
    if(yearCount===new Date().getFullYear()+544) {
        yearCount = 2490;
    } else {
        yearCount++;
    };
    year.textContent = yearCount;
    await termChange(monthCount, yearCount);
    calendarCal(monthCount, yearCount);
});

monthBack.addEventListener("click", async () => {
    if(monthCount===0){
        monthCount = 11;
        if(yearCount===2490) {
            yearCount = new Date().getFullYear()+544;
        } else {
            yearCount--;
        };
        year.textContent = yearCount;
    } else {
        monthCount--
    };
    month.textContent = monthNames[monthCount];
    await termChange(monthCount, yearCount);
    calendarCal(monthCount, yearCount);
});
monthGo.addEventListener("click", async () => {
    if(monthCount===11){
        monthCount = 0;
        if(yearCount===new Date().getFullYear()+544) {
            yearCount = 2490;
        } else {
            yearCount++;
        };
        year.textContent = yearCount;
    } else {
        monthCount++
    };
    month.textContent = monthNames[monthCount];
    await termChange(monthCount, yearCount);
    calendarCal(monthCount, yearCount);
});

dates.forEach((date) =>
    date.addEventListener("click", () => {
        if(!date.classList.contains("out-month") && !date.classList.contains("block-day")) {   
            cell.style.display = "block";
        };
    })
);

mon.forEach((monJr) =>
    monJr.addEventListener("click", async () => {
        if(!monJr.classList.contains("out-month") && !monJr.classList.contains("block-day")) {
            await classLoad("จันทร์", 0);
        };
    })
);
tue.forEach((tueJr) =>
    tueJr.addEventListener("click", async () => {
        if(!tueJr.classList.contains("out-month") && !tueJr.classList.contains("block-day")) {
            classLoad("อังคาร", 1);
        };
    })
);
wed.forEach((wedJr) =>
    wedJr.addEventListener("click", async () => {
        if(!wedJr.classList.contains("out-month") && !wedJr.classList.contains("block-day")) {
            classLoad("พุธ", 2);
        };
    })
);
thu.forEach((thuJr) =>
    thuJr.addEventListener("click", async () => {
        if(!thuJr.classList.contains("out-month") && !thuJr.classList.contains("block-day")) {
            classLoad("พฤหัสฯ", 3);
        };
    })
);
fri.forEach((friJr) =>
    friJr.addEventListener("click", async () => {
        if(!friJr.classList.contains("out-month") && !friJr.classList.contains("block-day")) {
            classLoad("ศุกร์", 4);
        };
    })
);

let term = termCheck(monthCount, yearCount);
let result = await classNormal(term);
console.log("load", term)

authChange(() => checkUser(user));

headerHeight();
calendarCal(monthCount, yearCount);