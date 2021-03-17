function generateURL(data) {
  const buildURL = `https://${data.shop}/admin/oauth/authorize?client_id=${data.apiKey}&scope=${data.scopes}&redirect_uri=${data.redirectUri}&state=${data.nonce}&grant_options[]=${data.accessMode}`;
  return buildURL;
}
