export const saveToLocalStorage = (theme) => {
  try {
    const appTheme = JSON.stringify(theme);
    localStorage.setItem("theme", appTheme);
  } catch (error) {
    console.warn(error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const appTheme = localStorage.getItem("theme");

    if (!appTheme) return undefined;

    return JSON.parse(appTheme);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};
