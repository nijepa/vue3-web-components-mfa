import { store } from '../store/store';
export const useFetch = async (url, method, data = undefined) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      //dataType: 'json',
      headers: {
        'Content-type': 'application/json'
      }
      //ContentType: 'application/json',
    });
    if (response.error || response.status !== 200) {
      store.responseMessage = {
        isError: response.status === 200 ? response.error : true,
        msg: response.errorMessage
          ? response.errorMessage
          : response.statusText,
      };
      return { error: true };
    } else {
      return response.json();
    }
  } catch (error) {
    console.log('Error: ', error);
    store.responseMessage.isError = true;
    store.responseMessage.msg = error;
    return { error: true };
  }
};
