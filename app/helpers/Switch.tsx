"use client";

import { ToggleColorButton } from "@/loading";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Switch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ToggleColorButton />;
  }

  return (
    <input
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      type="checkbox"
      className="toggle toggle-md mx-5"
    />
  );
};

export default Switch;
