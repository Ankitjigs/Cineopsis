import { useTheme } from "@emotion/react";

export function useTextColor() {
  const theme = useTheme();

  const textColor =
    theme?.palette?.mode === "light" ? "textColorLight" : "textColorDark";
  return textColor;
}


