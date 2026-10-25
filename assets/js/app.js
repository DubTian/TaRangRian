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

const dateBlocks = document.querySelectorAll(".date");
const mon = document.querySelectorAll(".mon");
const tue = document.querySelectorAll(".tue");
const wed = document.querySelectorAll(".wed");
const thu = document.querySelectorAll(".thu");
const fri = document.querySelectorAll(".fri");

const header = document.querySelector("header");

const dates = [
    document.getElementById("date1-1"),
    document.getElementById("date1-2"),
    document.getElementById("date1-3"),
    document.getElementById("date1-4"),
    document.getElementById("date1-5"),
    document.getElementById("date1-6"),
    document.getElementById("date1-7"),
    document.getElementById("date2-1"),
    document.getElementById("date2-2"),
    document.getElementById("date2-3"),
    document.getElementById("date2-4"),
    document.getElementById("date2-5"),
    document.getElementById("date2-6"),
    document.getElementById("date2-7"),
    document.getElementById("date3-1"),
    document.getElementById("date3-2"),
    document.getElementById("date3-3"),
    document.getElementById("date3-4"),
    document.getElementById("date3-5"),
    document.getElementById("date3-6"),
    document.getElementById("date3-7"),
    document.getElementById("date4-1"),
    document.getElementById("date4-2"),
    document.getElementById("date4-3"),
    document.getElementById("date4-4"),
    document.getElementById("date4-5"),
    document.getElementById("date4-6"),
    document.getElementById("date4-7"),
    document.getElementById("date5-1"),
    document.getElementById("date5-2"),
    document.getElementById("date5-3"),
    document.getElementById("date5-4"),
    document.getElementById("date5-5"),
    document.getElementById("date5-6"),
    document.getElementById("date5-7"),
    document.getElementById("date6-1"),
    document.getElementById("date6-2"),
    document.getElementById("date6-3"),
    document.getElementById("date6-4"),
    document.getElementById("date6-5"),
    document.getElementById("date6-6"),
    document.getElementById("date6-7")
];

const cellTimes = [
    document.getElementById("cellTime1"),
    document.getElementById("cellTime2"),
    document.getElementById("cellTime3"),
    document.getElementById("cellTime4"),
    document.getElementById("cellTime5"),
    document.getElementById("cellTime6"),
    document.getElementById("cellTime7"),
    document.getElementById("cellTime8"),
    document.getElementById("cellTime9"),
    document.getElementById("cellTime10"),
    document.getElementById("cellTime11")
];

const classes = [
    {
        "subject": document.getElementById("class1-1"),
        "teacher": document.getElementById("class1-2"),
        "room": document.getElementById("class1-3")
    },
    {
        "subject": document.getElementById("class2-1"),
        "teacher": document.getElementById("class2-2"),
        "room": document.getElementById("class2-3")
    },
    {
        "subject": document.getElementById("class3-1"),
        "teacher": document.getElementById("class3-2"),
        "room": document.getElementById("class3-3")
    },
    {
        "subject": document.getElementById("class4-1"),
        "teacher": document.getElementById("class4-2"),
        "room": document.getElementById("class4-3")
    },
    {
        "subject": document.getElementById("class5-1"),
        "teacher": document.getElementById("class5-2"),
        "room": document.getElementById("class5-3")
    },
    {
        "subject": document.getElementById("class6-1"),
        "teacher": document.getElementById("class6-2"),
        "room": document.getElementById("class6-3")
    },
    {
        "subject": document.getElementById("class7-1"),
        "teacher": document.getElementById("class7-2"),
        "room": document.getElementById("class7-3")
    },
    {
        "subject": document.getElementById("class8-1"),
        "teacher": document.getElementById("class8-2"),
        "room": document.getElementById("class8-3")
    },
    {
        "subject": document.getElementById("class9-1"),
        "teacher": document.getElementById("class9-2"),
        "room": document.getElementById("class9-3")
    },
    {
        "subject": document.getElementById("class10-1"),
        "teacher": document.getElementById("class10-2"),
        "room": document.getElementById("class10-3")
    },
    {
        "subject": document.getElementById("class11-1"),
        "teacher": document.getElementById("class11-2"),
        "room": document.getElementById("class11-3")
    }
];

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`)
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
            statusNav.src = "./assets/pictures/check.png"
            statusNav.title = "ยืนยันสถานะครูแล้ว"
        } else {
            statusNav.src = "./assets/pictures/cross.png"
            statusNav.title = "ยังไม่ได้ยืนยันสถานะครู"
        }

    } else {
        signUpNav.style.display = "block";
        logInNav.style.display = "block";
        logOutNav.style.display = "none";
        userNav.style.display = "none";
        statusNav.style.display = "none";
    };
} 

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

    for(let weekend in weekends) {
        dates[weekends[weekend]].classList.add("block-day");
    };
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

const classLoad = async (dayTh, dayEn, mv, yv) => {
    for(const classesJr of classes) {
        classesJr.subject.innerHTML = "&nbsp;";
        classesJr.teacher.innerHTML = "กำลังโหลด...";
        classesJr.room.innerHTML = "&nbsp;";
    };

    const result = await classNormal(dayEn, termCheck(mv, yv));
    classDay.textContent = dayTh;

    if(result[0]) {
        for(const [i, classesJr] of classes.entries()) {
            classesJr.subject.innerHTML = result[0].class[i].subject;
            classesJr.teacher.innerHTML = result[0].class[i].teacher;
            classesJr.room.innerHTML = result[0].class[i].room;
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

yearBack.addEventListener("click", () => {
    if(yearCount===2490) {
        yearCount = new Date().getFullYear()+544;
    } else {
        yearCount--;
    };
    year.textContent = yearCount;
    calendarCal(monthCount, yearCount);
});
yearGo.addEventListener("click", () => {
    if(yearCount===new Date().getFullYear()+544) {
        yearCount = 2490;
    } else {
        yearCount++;
    };
    year.textContent = yearCount;
    calendarCal(monthCount, yearCount);
});

monthBack.addEventListener("click", () => {
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
    calendarCal(monthCount, yearCount);
});
monthGo.addEventListener("click", () => {
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
    calendarCal(monthCount, yearCount);
});

dateBlocks.forEach((dateBlock) =>
    dateBlock.addEventListener("click", () => {
        if(!dateBlock.classList.contains("out-month") && !dateBlock.classList.contains("block-day")) {   
            cell.style.display = "block";
        };
    })
);

mon.forEach((monJr) =>
    monJr.addEventListener("click", async () => {
        if(!monJr.classList.contains("out-month") && !monJr.classList.contains("block-day")) {
            await classLoad("จันทร์", "mon", monthCount, yearCount);
        };
    })
);
tue.forEach((tueJr) =>
    tueJr.addEventListener("click", async () => {
        if(!tueJr.classList.contains("out-month") && !tueJr.classList.contains("block-day")) {
            classLoad("อังคาร", "tue", monthCount, yearCount);
        };
    })
);
wed.forEach((wedJr) =>
    wedJr.addEventListener("click", async () => {
        if(!wedJr.classList.contains("out-month") && !wedJr.classList.contains("block-day")) {
            classLoad("พุธ", "wed", monthCount, yearCount);
        };
    })
);
thu.forEach((thuJr) =>
    thuJr.addEventListener("click", async () => {
        if(!thuJr.classList.contains("out-month") && !thuJr.classList.contains("block-day")) {
            classLoad("พฤหัสฯ", "thu", monthCount, yearCount);
        };
    })
);
fri.forEach((friJr) =>
    friJr.addEventListener("click", async () => {
        if(!friJr.classList.contains("out-month") && !friJr.classList.contains("block-day")) {
            classLoad("ศุกร์", "fri", monthCount, yearCount);
        };
    })
);

authChange(() => checkUser(user));

headerHeight();
calendarCal(monthCount, yearCount);