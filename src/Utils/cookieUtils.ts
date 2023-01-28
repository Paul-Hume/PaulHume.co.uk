// Function to save a value to a cookie
export const setCookie = (name: string, value: string): void => {
  const valueToSave = `${value}; path=/`;
  document.cookie = `${name}=${valueToSave}`;
};

// Function to get a value from a cookie
export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};