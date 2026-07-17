"use client";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onFocus?: () => void;
};

export default function SearchInput({
    value,
    onChange,
    onFocus,
    placeholder = "Search anime ...",
}: SearchInputProps) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onFocus={onFocus}
        />
    );
}
