import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between">
            <Image
                src="/logo.png"
                alt="Icon"
                width="150"
                height="150"
                loading="eager"
            />
            <ul className="flex gap-4 mr-4">
                <li>
                    <Link
                        className="cursor-pointer hover:text-violet-400"
                        href="/search"
                    >
                        Search
                    </Link>
                </li>
                <li>
                    <a
                        className="cursor-pointer hover:text-violet-400"
                        href="/library"
                    >
                        Library
                    </a>
                </li>
                <li>
                    <a
                        className="cursor-pointer hover:text-violet-400"
                        href="/profile"
                    >
                        Profile
                    </a>
                </li>
            </ul>
        </div>
    );
}
