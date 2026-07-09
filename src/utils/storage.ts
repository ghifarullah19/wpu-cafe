const storage = typeof window === "undefined" ? null : localStorage;

const getLocalStorage = (key: string) => {
  return JSON.parse(storage?.getItem(key) || "null");
};

const setLocalStorage = (key: string, value: string) => {
  return storage?.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key: string) => {
  return storage?.removeItem(key);
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
