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

const date = [
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
]

const calendarCal = (yearCount, monthCount) => {
    let first = `${monthCount+1}-${1}-${yearCount-543}`;
    let last = `${monthCount+1}-${lastDate(monthCount, yearCount)}-${yearCount-543}`;
    let firstDay = new Date(first).getDay();
    let lastDay = new Date(last).getDay();
    let weekends = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41]

    date[firstDay].textContent = 1;
    date[firstDay].classList.remove("block-day", "out-month");
    console.log(firstDay, lastDay)
    console.log(lastDate(monthCount, yearCount))

    for(let i = 2; i<=lastDate(new Date().getMonth(), new Date().getFullYear()); i++) {
        date[firstDay+i-1].textContent = i;
        date[firstDay+i-1].classList.remove("block-day", "out-month");
    };

    for(let i = 0; firstDay-i-1>=0; i++) {
        date[firstDay-i-1].textContent = lastDate((monthCount-1+monthNames.length) % monthNames.length, yearCount)-i;
        date[firstDay-i-1].classList.add("out-month");
    };

    if(lastDate(monthCount, yearCount)===28 && firstDay===0) {
        console.log("first")
        for(let i = 1; i<=7; i++) {
            date[i+27].textContent = i;
            date[i+27].classList.add("out-month");
        };
        for(let i = 1; i<=7; i++) {
            date[i+34].textContent = i+13-lastDay;
            date[i+34].classList.add("out-month");
        };
    } else if((lastDate(monthCount, yearCount)>=30 && firstDay>=5) || firstDay===6) {
        console.log("second")
        for(let i = 1; lastDay+i<=6; i++) {
            date[lastDay+i+35].textContent = i;
            date[lastDay+i+35].classList.add("out-month");
        };
    } else if(lastDay===6){
        console.log("third")
        for(let i = 1; i<=7; i++) {
            date[i+34].textContent = i;
            date[i+34].classList.add("out-month");
        };
    } else {
        console.log("fourth")
        for(let i = 1; lastDay+i<=6; i++) {
            date[lastDay+i+28].textContent = i;
            date[lastDay+i+28].classList.add("out-month");
        };
        for(let i = 1; i<=7; i++) {
            date[i+34].textContent = i+6-lastDay;
            date[i+34].classList.add("out-month");
        };
    };

    for(let weekend in weekends) {
        date[weekends[weekend]].classList.add("block-day");
    }
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
    }
};

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

yearBack.addEventListener("click", () => {
    if(yearCount===2490) {
        yearCount = new Date().getFullYear()+544;
    } else {
        yearCount--;
    };
    year.textContent = yearCount;
    calendarCal(yearCount, monthCount);
});
yearGo.addEventListener("click", () => {
    if(yearCount===new Date().getFullYear()+544) {
        yearCount = 2490;
    } else {
        yearCount++;
    };
    year.textContent = yearCount;
    calendarCal(yearCount, monthCount);
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
    }
    month.textContent = monthNames[monthCount];
    calendarCal(yearCount, monthCount);
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
    }
    month.textContent = monthNames[monthCount];
    calendarCal(yearCount, monthCount);
});

dateBlocks.forEach((dateBlock) =>
    dateBlock.addEventListener("click", () => {
        if(!dateBlock.classList.contains("out-month") && !dateBlock.classList.contains("block-day")) {   
            cell.style.display = "block";
        };
    })
);

mon.forEach((monJr) =>
    monJr.addEventListener("click", () => {
        if(!monJr.classList.contains("out-month") && !monJr.classList.contains("block-day")) {
            classDay.textContent = "จันทร์";
        };
    })
);
tue.forEach((tueJr) =>
    tueJr.addEventListener("click", () => {
        if(!tueJr.classList.contains("out-month") && !tueJr.classList.contains("block-day")) {
            classDay.textContent = "อังคาร";
        };
    })
);
wed.forEach((wedJr) =>
    wedJr.addEventListener("click", () => {
        if(!wedJr.classList.contains("out-month") && !wedJr.classList.contains("block-day")) {
            classDay.textContent = "พุธ";
        };
    })
);
thu.forEach((thuJr) =>
    thuJr.addEventListener("click", () => {
        if(!thuJr.classList.contains("out-month") && !thuJr.classList.contains("block-day")) {
            classDay.textContent = "พฤหัสฯ";
        };
    })
);
fri.forEach((friJr) =>
    friJr.addEventListener("click", () => {
        if(!friJr.classList.contains("out-month") && !friJr.classList.contains("block-day")) {
            classDay.textContent = "ศุกร์";
        };
    })
);

calendarCal(yearCount, monthCount);