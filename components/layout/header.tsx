import Image from "next/image";
import SearchBar from "../features/search/search-bar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProfileDropdown from "../features/auth/profile-dropdown";

export default async function Header() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <div className="flex justify-between">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Icon"
                    width="150"
                    height="150"
                    loading="eager"
                />
            </Link>
            <ul className="flex gap-4 mr-4">
                <li>
                    <SearchBar />
                </li>
                <li>
                    <Link
                        className="cursor-pointer hover:text-violet-400"
                        href="/library"
                    >
                        Library
                    </Link>
                </li>
                {user ? (
                    <li>
                        <ProfileDropdown
                            email={user.email ?? ""}
                            avatarUrl={user.user_metadata.avatar_url}
                        />
                    </li>
                ) : (
                    <li>
                        <Link href="/auth">Login</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}
