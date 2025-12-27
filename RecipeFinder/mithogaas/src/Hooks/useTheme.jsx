import { BrowserRouter as Routes, Router, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import myBanner from '../assets/Images/Banner.jpg';
 
    export const useTheme = () => {
    const[theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    })

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark"){
            root.classList.add("dark");
        }else{
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

    return { theme, toggleTheme };
}
