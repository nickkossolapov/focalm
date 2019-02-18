const ROOT_URL = process.env.API_URL;

export const getApiGetRequest  = (endpoint, token=null) => {
  return getBaseRequest('GET', endpoint, token, null);
};

export const getApiPostRequest  = (endpoint, token, data=null) => {
  return getBaseRequest('POST', endpoint, token, data);
};

export const getApiPutRequest  = (endpoint, token, data=null) => {
  return getBaseRequest('PUT', endpoint, token, data);
};

export const getApiDeleteRequest  = (endpoint, token) => {
  return getBaseRequest('DELETE', endpoint, token, null);
};


function getBaseRequest(method, endpoint, token, data){
  const apiRequest = {
    method,
    url: ROOT_URL + endpoint,
    ...(token && {headers: {
        token: token
      }}),
    ...(data && {data})
  };
  return apiRequest;
};
