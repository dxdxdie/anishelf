import LogoutButton from "@/components/features/auth/logout-button";
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
            <div>{user.email}</div>
            <div>
                <Image
                    src={user.user_metadata.avatar_url}
                    alt="User's avatar"
                    width={75}
                    height={75}
                />
            </div>
            <LogoutButton />
        </div>
    );
};

export default ProfilePage;
