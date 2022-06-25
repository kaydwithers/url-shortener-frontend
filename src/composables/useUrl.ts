import { ref } from "vue";

import { API_URL } from "@/lib/const";
import { useHttpClient } from "@/composables/useHttp";

import type { UrlInterface } from "@/lib/interfaces/urlInterface";

export const urls = ref(Array<UrlInterface>());

export const useUrl = () => {
  const { sendRequest } = useHttpClient();

  /**
   * Adds a URL.
   * @param url - The URL.
   */
  const addUrl = async (url: string) => {
    try {
      await sendRequest(
        `${API_URL}/api/shorturl`,
        "POST",
        JSON.stringify({
          longUrl: url,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  /**
   * Deletes a URL.
   * @param shortUrl
   */
  const deleteUrl = async (shortUrl: string) => {
    try {
      await sendRequest(`${API_URL}/api/shorturls/${shortUrl}`, "DELETE", null);
    } catch (err) {}
  };

  /**
   * Populate the URL data.
   */
  const getUrls = async () => {
    try {
      const responseData = await sendRequest(`${API_URL}/api/urls`);
      urls.value = responseData.shortUrls;
    } catch (err) {}
  };

  return {
    addUrl,
    deleteUrl,
    getUrls,
    urls,
  };
};
