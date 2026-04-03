"use client";

import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

export type Lang = "ko" | "en";

interface LanguageContextType {
    lang: Lang;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "ko",
    toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window === "undefined") return "ko";
        const stored = localStorage.getItem("lang");
        return stored === "ko" || stored === "en" ? stored : "ko";
    });

    const toggle = () => {
        setLang((prev) => {
            const next: Lang = prev === "ko" ? "en" : "ko";
            localStorage.setItem("lang", next);
            return next;
        });
    };

    return React.createElement(
        LanguageContext.Provider,
        { value: { lang, toggle } },
        children,
    );
}

export function useLanguage(): LanguageContextType {
    return useContext(LanguageContext);
}
