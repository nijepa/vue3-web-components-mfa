import { store } from "../store/store";
export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      dataType: "json",
      data,
      ContentType: "application/json",
    });
    if (response.status === 200) return response.json();
    store.error = "cips.mfa.error_message.status";
    return { error: true };
    // return {error: true, msg: `Error: ${response.status} - ${response.statusText}`}
    // throw new Error(`status: ${response.status}, statusText: ${response.statusText}`)
  } catch (error) {
    console.log("Error: ", error);
    store.error = error
    return { error: true };
  }
};
