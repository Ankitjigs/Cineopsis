import { useTheme } from "@emotion/react";

export function useBackgroundColor() {
  const theme = useTheme();

  const backgroundColor =
    theme?.palette?.mode === "light"
      ? "backgroundColorLight"
      : "backgroundColorDark";
  return backgroundColor;
}
