const pickFields = <T extends Record<string, unknown>, F extends keyof T>(
  query: T,
  fields: F[]
): Partial<T> => {
  const selectedQuery: Partial<T> = {};

  if (!query) {
    return selectedQuery;
  }
  for (const field of fields) {
    if (
      Object.entries(query).length > 0 &&
      Object.hasOwnProperty.call(query, field)
    ) {
      selectedQuery[field] = query[field];
    }
  }
  return selectedQuery;
};

export default pickFields;
