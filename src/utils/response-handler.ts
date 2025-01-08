export const handleResponse = (message: string, data?: any) => {
  return data ? { message, data } : { message };
};
