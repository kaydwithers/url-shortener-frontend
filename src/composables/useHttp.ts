import { ref } from "vue";

export const useHttpClient = () => {
  const error = ref(null);
  const isLoading = ref(false);

  const sendRequest = async (
    url: string,
    method = "GET",
    body: string | null = null,
    headers = {}
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      isLoading.value = false;

      return responseData;
    } catch (err: any) {
      error.value = err.message;
      isLoading.value = false;
      throw err;
    }
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};
