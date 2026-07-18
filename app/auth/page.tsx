"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
    const handleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: { redirectTo: window.location.origin + "/profile" },
        });
    };
    return <Button onClick={handleLogin}>Login with GitHub</Button>;
};

export default AuthPage;
