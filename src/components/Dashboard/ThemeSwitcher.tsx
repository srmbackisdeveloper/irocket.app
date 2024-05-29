import React from "react";
import { SunIcon } from "../shared/icons/Sun.icon";
import { MoonIcon } from "../shared/icons/Moon.icon";
import { useTheme } from "next-themes";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="items-center gap-1 cursor-pointer hidden md:flex" onClick={handleToggle}>
      {!isDark ? (
        <MoonIcon className="text-2xl" />
      ) : (
        <SunIcon className="text-2xl" />
      )}
      <p>Тема</p>
    </div>
  );
};

export default ThemeSwitcher;
