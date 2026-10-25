import { logIn, logInOtp, verifyLogIn, userSession, authChange } from "./database.js";

const email = document.getElementById("email");
const errorEmail = document.getElementById("errorEmail");
const password = document.getElementById("password");
const errorPassword = document.getElementById("errorPassword");
const submit = document.getElementById("submit");
const formLogIn = document.getElementById("logIn");
const goEmail = document.getElementById("goEmail");
const formLogInOtp = document.getElementById("logInOtp");
const verifyEmail = document.getElementById("verifyEmail");
const goPassword = document.getElementById("goPassword");
const emailOtp = document.getElementById("emailOtp");
const errorEmailOtp = document.getElementById("errorEmailOtp");
const submitEmail = document.getElementById("submitEmail");
const verifyOtp = document.getElementById("verifyOtp");
const backEmail = document.getElementById("backEmail");
const submitOtp = document.getElementById("submitOtp");

const otps = document.querySelectorAll(".otp");

const header = document.querySelector("header");
const main = document.querySelector("main");

const headerHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--header_height", `${height}px`)
};

const emailCheck = email => {
    if(email.value!=="" && email.checkValidity()) {
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
    };
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
    };
};
const emailOtpCheck = emailOtp => {
    if(emailOtp.value!=="" && emailOtp.checkValidity()) {
        errorEmailOtp.style.display = "none";
        emailOtp.classList.remove("error-input");
        return true;
    } else if(email.value === "") {
        errorEmailOtp.textContent = "*กรุณากรอกอีเมล"
        errorEmailOtp.style.display = "block";
        emailOtp.classList.add("error-input");
        return false;
    } else if(!emailOtp.checkValidity()) {
        errorEmailOtp.textContent = "*กรุณากรอกอีเมลที่ถูกต้อง";
        errorEmailOtp.style.display = "block";
        emailOtp.classList.add("error-input");
        return false;
    };
};

const otpSum = () => {
    let sum = "";
    otps.forEach(otp => {
        sum += otp.value;
        console.log(sum)
    });
    return(sum);
};

email.addEventListener("input", () => {
    email.value = email.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    emailCheck(email);
});
password.addEventListener("input", () => {
    password.value = password.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    passwordCheck(password);
});
emailOtp.addEventListener("input", () => {
    emailOtp.value = emailOtp.value.replace(/[^A-Za-z0-9@#$!+*/=^._-]/g, "");
    emailOtpCheck(emailOtp);
});

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const emailChecked = emailCheck(email);
    const passwordChecked = passwordCheck(password);

    if(emailChecked && passwordChecked) {
        await logIn(email, password);
    };
});

goEmail.addEventListener("click", () => {
    formLogIn.style.display = "none"
    formLogInOtp.style.display = "block"
    verifyEmail.style.display = "block";
})
goPassword.addEventListener("click", () => {
    verifyEmail.style.display = "none";
    formLogInOtp.style.display = "none"
    formLogIn.style.display = "block";
    
});
backEmail.addEventListener("click", e => {
    e.preventDefault();
    verifyOtp.style.display = "none";
    verifyEmail.style.display = "block";
});

submitEmail.addEventListener("click", async (e) => {
    e.preventDefault();

    if(emailOtpCheck(emailOtp)) {
        main.style.animation = "2s loading linear infinite";
        if(await logInOtp(emailOtp)) {
            verifyEmail.style.display = "none";
            verifyOtp.style.display = "block";
        };
        main.style.animation = "";
    };
});

submitOtp.addEventListener("click", async (e) => {
    e.preventDefault();
    main.style.animation = "2s loading linear infinite";
    if(await verifyLogIn(emailOtp, otpSum())) {
        window.location.href = "../"
    };
    main.style.animation = "";
});

otps.forEach((otp, index) => {
    otp.addEventListener("input", () => {
        otp.value = otp.value.replace(/[^\d]/g, "")
        if(otp.value && index<otps.length-1) {
            otps[index+1].focus();
        };
    });
    otp.addEventListener("keydown", e => {
        if(e.key==="Backspace" && !otp.value && index>0) {
            otps[index-1].focus();
        };
    });
    otp.addEventListener("paste", e => {
        const pasted = e.clipboardData.getData("text").trim();

        if(/^\d+$/.test(pasted)) {
            const numValue = pasted.split("");
            otps.forEach((otp, index) => {
                if(numValue[index]) {
                    otp.value = numValue[index];
                };
            });
            const lastIndex = Math.min(numValue.length, otps.length)-1;
            otps[lastIndex].focus();
        };
    });
});

authChange(async () => {
    if(await userSession()) {
        window.location.href = "../"
    };
});

headerHeight();