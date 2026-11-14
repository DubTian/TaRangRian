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
        return true;
    };
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
    } else {
        window.location.reload();
    };
};

export const checkUsernameDb = async (username) => {
    const { data } = await db.rpc("check_username", {
        p_username: username.value,
    });

    return !data
};

export const checkEmailDb = async (email) => {
    const { data } = await db.rpc("check_email", {
        p_email: email.value,
    });

    if(data) {
        return false;
    } else {
        return true;
    };
};

export const checkTeacherDb = async () => {
    const { data, error } = await db.from("profiles")
        .select("teacher");

    if(error) {
        console.error("Error", error);
    } else {
        return data[0].teacher;
    };
};

export const verifyTeacherDb = async (password) => {
    const { data, error } = await db.rpc("verify_teacher", {
        p_password: password.value,
    });

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const userSession = async () => {
    const { data } = await db.auth.getSession();
    return(data.session);
};

export const authChange = (callback) => 
    db.auth.onAuthStateChange((event, session) => {
        if(typeof callback === "function") {
            callback(event, session);
        };
    });

export const classNormal = async (term) => {
    const { data, error } = await db.from("classNormalDays")
        .select("class")
        .eq("term", term)
        .order("id", {ascending: true});

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const loadClassType = async () => {
    const { data, error } = await db.from("classTypes")
        .select("hour1, hour2, hour3, hour4, hour5, hour6, hour7, hour8, hour9, hour10, hour11");
    
    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const checkDateClass = async (date) => {
    const { data, error } = await db.from("classChanges")
        .select("*")
        .eq("date", date)
        .maybeSingle();
        
        if(error) {
            console.error("Error", error);
        } else {
            return !!data;
        };
    };
    
export const loadDateClass = async (date) => {
    const { data, error } = await db.from("classChanges")
        .select("*")
        .eq("date", date)
        .maybeSingle();

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const saveClass = async (date, classType, subject) => {
    const { data, error } = await db.from("classChanges")
        .insert({date: date, classType: classType, class: subject});

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const updateClass = async (date, classType, subject) => {
    const { data, error } = await db.from("classChanges")
        .update({classType: classType, class: subject})
        .eq("date", date);

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};

export const daleteClass = async (date) => {
    const { data, error } = await db.from("classChanges")
        .delete()
        .eq("date", date);

    if(error) {
        console.error("Error", error);
    } else {
        return data;
    };
};