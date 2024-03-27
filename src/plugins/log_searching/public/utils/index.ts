export function findObjects(obj: any, key: any) {
  let foundObjects: any = [];
  for (const k in obj) {
    if (k === key) {
      foundObjects.push(obj[k]);
    } else if (typeof obj[k] === 'object') {
      foundObjects = foundObjects.concat(findObjects(obj[k], key));
    }
  }
  return foundObjects;
}

export const clearQueryParams = () => {
  if (window && window.history && window.history.pushState) {
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
};
