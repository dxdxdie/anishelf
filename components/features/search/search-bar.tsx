"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchAnime } from "@/hooks/use-search-anime";
import SearchInput from "./search-input";
import SearchDropdown from "./search-dropdown";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setCurrentText] = useState<string>("");
    const debouncedValue = useDebounce(currentText, 400);
    const { data, isLoading, isError } = useSearchAnime(debouncedValue);
    const router = useRouter();

    const handleChange = (value: string) => {
        setCurrentText(value);
        setIsOpen(value.length > 0);
    };

    const handleSelect = (mal_id: number) => {
        router.push(`/anime/${mal_id}`);
        setIsOpen(false);
    };

    const handleFocus = () => {
        if (currentText) {
            setIsOpen(true);
        } else setIsOpen(false);
    };

    return (
        <div>
            <SearchInput
                onChange={handleChange}
                value={currentText}
                onFocus={handleFocus}
            />
            <SearchDropdown
                data={data}
                isLoading={isLoading}
                isError={isError}
                onSelect={handleSelect}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
}
