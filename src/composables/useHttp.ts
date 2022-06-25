import { ref } from "vue";

/** Error state. */
export const error = ref("");

/** Whether or not any logic is loading. */
export const isLoading = ref(false);

export const useHttpClient = () => {
  /**
   * Sends a fetch request and returns a data object.
   * @param url
   * @param method
   * @param body
   * @param headers
   * @returns {object}
   */
  const sendRequest = async (
    url: string,
    method = "GET",
    body: string | null = null,
    headers = {}
  ) => {
    isLoading.value = true;
    error.value = "";

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
