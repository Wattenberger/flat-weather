// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
// You can test this script locally on your computer by runinng `deno run -A --unstable postprocess.ts data.json`
import { readJSON, writeJSON } from "https://deno.land/x/flat@0.0.15/mod.ts";

// Get the data filename as the first argument
const filename = Deno.args[0];
const data = await readJSON(filename);

// Postprocess steps

const weatherIcons = {
  "01d": "☀️", // clear sky
  "02d": "🌤", // few clouds
  "03d": "☁️", // scattered clouds
  "04d": "☁️", // broken clouds
  "09d": "🌧", // shower rain
  "10d": "🌦", // rain
  "11d": "🌩️", //	thunderstorm
  "13d": "❄️", //	snow
  "50d": "", //
};
const processedData = data.list.map((day) => {
  return {
    date: day.dy,
    temp: day.temp.day,
    tempRange: [day.temp.min, day.temp.max],
    feelsLike: day.feels_like.day,
    sunrise: day.sunrise,
    sunset: day.sunset,
    pressure: day.pressure,
    humidity: day.humidity,
    windSpeed: day.speed,
    windDirection: day.deg,
    clouds: day.clouds,
    windGust: day.gust,
    icon: weatherIcons[day.weather[0].icon],
  };
});

await writeJSON(`${filename}.processed.json`, processedData);

// basic structure
// {
//   "dt":1568977200,
//   "sunrise":1568958164,
//   "sunset":1569002733,
//   "temp":{
//      "day":293.79,
//      "min":288.85,
//      "max":294.47,
//      "night":288.85,
//      "eve":290.44,
//      "morn":293.79
//   },
//   "feels_like":{
//      "day":278.87,
//      "night":282.73,
//      "eve":281.92,
//      "morn":278.87
//   },
//   "pressure":1025.04,
//   "humidity":42,
//   "weather":[
//      {
//         "id":800,
//         "main":"Clear",
//         "description":"sky is clear",
//         "icon":"01d"
//      }
//   ],
//   "speed":4.66,
//   "deg":102,
//   "gust": 5.3,
//   "clouds":0,
//   "pop":0.24
// },
