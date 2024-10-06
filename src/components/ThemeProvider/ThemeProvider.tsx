'use client';

import { useEffect, useState } from "react";

import ThemeContext from "@/context/themeContext";

const ThemeProvide = ({ children }: { children: React.ReactNode }) => {
    const themeFromStorage: boolean = typeof localStorage !== 'undefined' && localStorage.getItem('hotel-theme') ? JSON.parse(localStorage.getItem('hotel-theme')!) : false;

    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
    const [renderCompnent, setRenderCompnent] = useState(false);

    useEffect(() => {
        setRenderCompnent(true);
    }, []);

    if (!renderCompnent) return <></>;

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            <div className={`${darkTheme ? 'dark': ''} min-h-screen`}>
                <div className="dark:text-white dark:bg-black text-[#1E1E1E]">
                    {children}
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeProvide;
