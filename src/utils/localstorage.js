export const LocalStorageSet = (name, token) => {
  if (token && name) {
    localStorage.setItem(name, token);
    return true;
  } else {
    return false;
  }
};

export const LocalStorageGet = (name) => {
  if (name) {
    const value = localStorage.getItem(name);
    return value;
  }
};
