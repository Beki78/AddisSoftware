import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchMusic = async () => {
  try {
    const response = await axios.get(API_URL);
    const music = response.data.music[3].title;
    console.log("Fetched Music Data:", music);
    return music;
  } catch (error) {
    // Type assertion to Error
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};
