export const formatFilterLabel = (fieldName: string, value: string) => {
  switch (fieldName) {
    case "thickness":
      return value.replace(/^THICKNESS\s+/i, "");

    case "size":
      return value.replace(/^SIZE\s+/i, "");

    default:
      return value;
  }
};
