import apiClient from "./api-client";

export const getAnswer = async (question: any) => {
  const { data } = await apiClient.post("/gemini", question);
  return data;
};
