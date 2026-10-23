const { createClient } = supabase;
const db = createClient('https://vmzamuxfadsdzjavoacd.supabase.co', 'sb_publishable_YKc0HiMVzwY1KXz6aq0cjA_MTKofqqN');

export const signUp = async (username, email, password) => {
    const { error } = await db.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                username: username.value,
            },
        },
    });

    if(error) {
        console.error("Error", error);
        return false;
    };

    return true;
};

export const signUpOtp = async (email, otp) => {
    const { verifyError } = await db.auth.verifyOtp({
        email: email.value,
        token: otp,
        type: "signup"
    });

    if(verifyError) {
        console.error("Error", verifyError);
    } else{
        window.location.href = "../"
    };
}

export const logIn = async (email, password) => {
    const { error } = await db.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if(error) {
        console.error("Error", error);
        return;
    };

    window.location.href = "../";
};

export const logInOtp = async (emailOtp) => {
    const { error } = await db.auth.signInWithOtp({
        email: emailOtp.value,
    })

    if(error) {
        console.error("Error", error);
        return false;
    };

    return true;
};

export const verifyLogIn = async (emailOtp, otp) => {
    const { error } = await db.auth.verifyOtp({
        email: emailOtp.value,
        token: otp,
        type: "email",
    });

    if(error) {
        console.error("Error", error);
        return false;
    };
    
    return true;
};

export const logOut = async () => {
    const { error } = await db.auth.signOut();

    if(error) {
        console.error("Error", error);
        return[];
    } else {
        window.location.reload();
    };
};

export const userSession = async () => {
    const { data } = await db.auth.getSession();
    return(data.session);
};

export const checkUsernameDb = async (username) => {
    const { data } = await db.from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();

    if(data) {
        return false;
    }

    return true;
}

export const classNormal = async (day, term) => {
    const { data, error } = await db.from("classNormalDays")
        .select("*")
        .eq("day", day)
        .eq("term", term);

    if(error) {
        console.error("Error", error);
        return;
    };

    return(data);
};