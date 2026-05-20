const axios = require("axios");
const { getStore } = require("@netlify/blobs");

exports.handler = async function(event, context, callback) {
  const handleRequest = async () => {
    const url = process.env.VITE_311_URL;
    const apiKey = process.env.API_KEY;
    const data = JSON.parse(event.body);
    const {
      category,
      description,
      fullName = "",
      emailAddress,
      phoneNumber,
      lat,
      long,
      image
    } = data;

    const response = new Promise(async (resolveResponse, rejectResponse) => {
      const buf = Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const store = getStore("images");
      const key = `311-sf/temp-images/${Date.now()}-img.jpg`;
      await store.set(key, buf, { contentType: "image/jpeg" });
      const media_url = store.getPublicUrl(key);
      console.log(media_url);

      const domain = `${url}/open311/v2/requests.json`;
      const formattedDescription = `[${category}] ${description.trim() ||
        "Blocked bike lane"}`;
      domain;
      apiKey;
      data; //?
      const [first_name = "", last_name = ""] = fullName.split(" ");
      const parameters = {
        api_key: apiKey,
        service_code: "5a6b5ac2d0521c1134854b01",
        lat,
        long,
        first_name,
        last_name,
        phone: phoneNumber,
        description: formattedDescription,
        media_url,
        "attribute[Nature_of_request]": "Blocking_Bicycle_Lane"
      };

      console.log(
        "url:",
        `${domain}?${new URLSearchParams(parameters).toString()}`
      );

      axios
        .post(`${domain}?${new URLSearchParams(parameters).toString()}`)
        .then(function({ data }) {
          let formattedData = "";
          try {
            formattedData = JSON.stringify(data[0]);
          } catch (err) {
            rejectResponse(err);
          }
          resolveResponse(formattedData);
        })
        .catch(function(err) {
          console.error(new Error(err));
        });
    });
    return response;
  };
  try {
    const body = await handleRequest();
  } catch (error) {
    console.error(new Error(error));
  }
  console.log("body", body);
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(body)
  });
};
