const removeUndefinedKeys = (obj) => {
  return Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  );
};

export default removeUndefinedKeys;
