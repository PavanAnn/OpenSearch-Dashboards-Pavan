export function removeEmptyString(obj:any):any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => [
        key,
        value === Object(value) ? removeEmptyString(value) : value,
      ]),
  );
}

