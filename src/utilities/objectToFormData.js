export default function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = '',
) {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const fullKey = parentKey
        ? Array.isArray(obj)
          ? `${parentKey}[${key}]`
          : `${parentKey}.${key}`
        : key;

      if (value instanceof File) {
        formData.append(fullKey, value);
      } else if (value instanceof Blob) {
        formData.append(fullKey, value, value.name);
      } else if (value instanceof Date) {
        formData.append(fullKey, value.toISOString());
      } else if (
        value instanceof Object &&
        !(value instanceof File) &&
        !(value instanceof Blob)
      ) {
        objectToFormData(value, formData, fullKey);
      } else {
        formData.append(fullKey, value);
      }
    }
  }
  return formData;
}
