export const wrapSuccess = <T>(data: T) => {
  return { success: true, result: data };
};
