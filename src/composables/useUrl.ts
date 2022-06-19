import { ref } from "vue";

import { BACKEND_URL } from "@/lib/const";
import { useHttpClient } from "@/composables/useHttp";

export const useUrl = () => {
  const { sendRequest } = useHttpClient();

  const urls = ref([]);

  const addUrl = async (url: string) => {
    try {
      await sendRequest(
        `${BACKEND_URL}/api/shorturl`,
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
      await sendRequest(
        `${BACKEND_URL}/api/shorturls/${shortUrl}`,
        "DELETE",
        null
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getUrls = async () => {
    try {
      const responseData = await sendRequest(`${BACKEND_URL}/api/urls`);
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
