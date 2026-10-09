const dateBlocks = document.querySelectorAll(".date");
const cell = document.getElementById("cell");
const year = document.getElementById("yearValue");
const month = document.getElementById("monthValue");
const yearBack = document.getElementById("yearBack");
const yearGo = document.getElementById("yearGo");
const monthBack = document.getElementById("monthBack");
const monthGo = document.getElementById("monthGo");

let now = new Date();
let yearCount = now.getFullYear()+543;
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
let monthCount = now.getMonth();
month.textContent = monthNames[monthCount];

dateBlocks.forEach(function(dateBlock) {
    dateBlock.addEventListener("click", function() {
        cell.style.display = "block"
    });
});

yearBack.addEventListener("click", function() {
    if(yearCount==2490) {
        console.log("yes")
        yearCount = 2570;
    } else {
        yearCount = yearCount-1;
    };
    year.textContent = yearCount;
});
yearGo.addEventListener("click", function() {
    if(yearCount==now.getFullYear()+544) {
        yearCount = 2490;
        console.log("yes")
    } else {
        yearCount = yearCount+1;
    };
    year.textContent = yearCount;
});

monthBack.addEventListener("click", function() {
    monthCount = (monthCount-1+monthNames.length) % monthNames.length;
    month.textContent = monthNames[monthCount]
});
monthGo.addEventListener("click", function() {
    monthCount = (monthCount+1) % monthNames.length;
    month.textContent = monthNames[monthCount];
});