export const getItemFromLocalStorage = key => {
  const item = localStorage.getItem(key);
  return item?.includes('{') || item?.includes('[') ? JSON.parse(item) : item;
};

export function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  }
  return '';
}
