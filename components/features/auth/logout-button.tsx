"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            router.push("/auth");
        } catch (err) {
            setIsError(true);
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Failed to exit");
            }
        }
    };
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
            {isError ? <div>{errorMessage}</div> : null}
        </div>
    );
};

export default LogoutButton;
