import LogoutButton from "@/app/auth/logout-button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    return (
        <div>
            {!user ? (
                <div>Nothing to display there, try to login first</div>
            ) : (
                <div>
                    <div>{user.email}</div>
                    <div>
                        <Image
                            src={user.user_metadata.avatar_url}
                            alt="User's avatar"
                            width={150}
                            height={150}
                        />
                    </div>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
