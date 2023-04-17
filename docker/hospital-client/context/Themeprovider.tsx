import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemeContextType = {
  isTheme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isTheme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let [inStorage, setInStorage] = useState(false);
  let [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (inStorage === false) {
      let storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }
      setInStorage(true);
    }
  }, [inStorage]);

  useEffect(() => {
    if (theme === "dark") {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeTheme = (theme: string) => {
    if (theme === "dark") {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider
      value={{ isTheme: theme, toggleTheme, setTheme: changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
