export const mapper = (messages) => {
  return messages.map(({ id, value }) => ({
    id,
    value,
  }));
};
