const { createClient } = supabase;
export const db = createClient('https://vmzamuxfadsdzjavoacd.supabase.co', 'sb_publishable_YKc0HiMVzwY1KXz6aq0cjA_MTKofqqN');

export const classNormal = async (day, term) => {
    const { data, error } = await db.from("classNormalDays")
        .select("*")
        .eq("day", day)
        .eq("term", term);

    if(error) {
        console.error("Error", error);
        return[];
    };

    return(data);
};