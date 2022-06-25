import { ref } from "vue";

import { API_URL } from "@/lib/const";
import { useHttpClient } from "@/composables/useHttp";

import type { UrlInterface } from "@/lib/interfaces/urlInterface";

export const useUrl = () => {
  const { sendRequest } = useHttpClient();

  const urls = ref(Array<UrlInterface>());

  const addUrl = async (url: string) => {
    try {
      await sendRequest(
        `${API_URL}/shorturl`,
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

  const deleteUrl = async (shortUrl: string) => {
    try {
      await sendRequest(`${API_URL}/api/shorturls/${shortUrl}`, "DELETE", null);
    } catch (err) {}
  };

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
