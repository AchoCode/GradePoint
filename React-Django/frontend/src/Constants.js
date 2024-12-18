export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

export const Capitalize = (str) => {
  const formattedString = String(str);
  return (
    formattedString.charAt(0).toUpperCase() +
    formattedString.slice(1).toLowerCase()
  );
};
