"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import LogoutButton from "./logout-button";

type ProfileDropdownProps = {
    email: string;
    avatarUrl: string | null | undefined;
};

const ProfileDropdown = ({ email, avatarUrl }: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const imgSrc = avatarUrl || "/default-avatar-64.png";

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    const handleClicks = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div ref={ref} className="relative">
            <button onClick={handleClicks}>
                <Image
                    src={imgSrc}
                    width={50}
                    height={50}
                    alt="User's avatar"
                    className="rounded-full"
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-md border bg-white shadow-lg z-50">
                    <div className="text-black">{email}</div>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
