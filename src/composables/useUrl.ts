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
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUrl = async (shortUrl: string) => {
    try {
      await sendRequest(`${API_URL}/shorturls/${shortUrl}`, "DELETE", null);
    } catch (err) {
      console.error(err);
    }
  };

  const getUrls = async () => {
    try {
      const responseData = await sendRequest(`${API_URL}/urls`);
      urls.value = responseData.shortUrls;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addUrl,
    deleteUrl,
    getUrls,
    urls,
  };
};
