export const createReaderLocalStorage = <TValue>(key: string) => ({
  key,
  read() {
    const json = localStorage.getItem(this.key);
    if (json) return JSON.parse(json) as TValue;
    return null;
  },
  write(globalSettings: TValue) {
    localStorage.setItem(this.key, JSON.stringify(globalSettings));
  },
  delete() {
    localStorage.removeItem(this.key);
  }
});
