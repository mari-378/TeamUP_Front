import { createContext, useContext, useState } from "react";
import { Cores } from "../constants/Cores";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [tema, setTema] = useState('light');

    const alternarTema = () => {
        setTema((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ tema, temaAtual: Cores[tema], alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    return useContext(ThemeContext);
};