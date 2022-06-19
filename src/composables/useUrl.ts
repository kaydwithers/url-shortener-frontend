import { ref } from "vue";

import { BACKEND_URL } from "@/lib/const";
import { useHttpClient } from "@/composables/useHttp";

export const useUrl = () => {
  const { sendRequest } = useHttpClient();

  const urls = ref([]);

  const addUrl = async (url: string) => {
    console.log("url: ", url);

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
      console.error("addUrl error: ", err);
    }
  };

  const deleteUrl = async (shortUrl: string) => {
    console.log("deleteUrl");

    try {
      await sendRequest(
        `${BACKEND_URL}/api/shorturls/${shortUrl}`,
        "DELETE",
        null
      );
    } catch (err) {}
  };

  const editUrl = async () => {
    try {
      await sendRequest(
        `${BACKEND_URL}/api/urls/${urlId.value}`,
        "PATCH",
        JSON.stringify({
          title: "Tile patch",
          description: "Description patch",
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // auth.token
        }
      );
    } catch (err) {}
  };

  const getUrls = async () => {
    try {
      const responseData = await sendRequest(`${BACKEND_URL}/api/urls`);

      urls.value = responseData.shortUrls;

      console.log("getUrls responseData", responseData);
    } catch (err) {
      console.error("getUrls error: ", err);
    }
  };

  return {
    addUrl,
    deleteUrl,
    editUrl,
    getUrls,
    urls,
  };
};
