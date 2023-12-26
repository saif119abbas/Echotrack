const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
let lat = "",
  lon = "",
  called = false;
async function getGeolocation() {
  try {
    const response = await axios.get("https://ipinfo.io/json");
    const data = JSON.parse(stringify(response.data));
    const loc = data.loc.split(",");
    lat = loc[0];
    lon = loc[1];

    console.log("Geolocation Information:");
    console.log(`IP: ${data.ip}`);
    console.log(`Location: ${data.city}, ${data.region}, ${data.country}`);
    console.log(`Coordinates: ${data.loc}`);
    console.log(data);
  } catch (error) {
    console.error("Error fetching geolocation:", error.message);
  }
}
function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}
if (!called) getGeolocation();
const API_KEY = process.env.API_KEY;
exports.curentWeather = catchAsync(async (req, res) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = JSON.parse(stringify(response.data));
  console.log(data);
  //const data = JSON.parse(response);
  return res.status(200).send(data);
});
exports.forecast = catchAsync(async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = JSON.parse(stringify(response.data));
  console.log(data);
  //const data = JSON.parse(response);
  return res.status(200).send(data);
});
exports.globalalert = catchAsync(async (req, res) => {
  const response = await axios.post(`http://test_url.test`);

  const data = JSON.parse(stringify(response.data));
  console.log(data);
  //const data = JSON.parse(response);
  return res.status(200).send(data);
});
