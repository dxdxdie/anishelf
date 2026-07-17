"use client";

import { Anime } from "@/types/anime";
import { useRef, useEffect } from "react";

type SearchDropdownProps = {
    data: Anime[] | undefined;
    isLoading: boolean;
    isError: boolean;
    onSelect: (mal_id: number) => void;
    isOpen: boolean;
    onClose: () => void;
};

export default function SearchDropdown({
    data,
    isLoading,
    isError,
    onSelect,
    isOpen,
    onClose,
}: SearchDropdownProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose, isOpen]);

    if (!isOpen) return null;
    if (isError) return <div ref={ref}>Error while loading</div>;
    if (isLoading) return <div ref={ref}>Loading...</div>;
    if (data && data.length >= 1) {
        return (
            <div ref={ref}>
                <ul>
                    {data.map((el) => (
                        <li key={el.mal_id}>
                            <button onClick={() => onSelect(el.mal_id)}>
                                {el.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (data?.length === 0) {
        return <div ref={ref}>Theres nothing to display</div>;
    } else {
        return null;
    }
}
