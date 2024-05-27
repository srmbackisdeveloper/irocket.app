import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "../shared/icons/Sun.icon";
import { MoonIcon } from "../shared/icons/Moon.icon";
import { useTheme } from "next-themes";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // To prevent hydration mismatch error in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Switch
      checked={isDark}
      onChange={handleToggle}
      size="md"
      color="danger"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    >
    </Switch>
  );
};

export default ThemeSwitcher;
