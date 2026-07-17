import { getLocalStorage, removeLocalStorage } from "./storage";

const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (response.status === 401 && !url.includes("/auth/login")) {
    removeLocalStorage("auth");
    window.location.href = "/login";
    return;
  }

  const data = await response.json();
  return data;
};

export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && !url.includes("/auth/login")) {
      removeLocalStorage("auth");
      window.location.href = "/login";
      return;
    }
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
};

export default fetchAPI;
