const SUPABASE_URL =
    "https://zaovtxcjkyycvgrlxobn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_HG0PBzR1xCJitsAPZ9p7Wg_4TvqFh_q";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false
        }
    }
);


window.ensureAnonymousSession = async function () {

    const {
        data: { session }
    } = await window.db.auth.getSession();


    if (session?.user) {
        return session.user;
    }


    const {
        data,
        error
    } = await window.db.auth.signInAnonymously();


    if (error) {
        throw error;
    }


    return data.user;
};
