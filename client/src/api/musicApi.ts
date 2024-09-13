import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchMusic = async () => {
  try {
    const response = await axios.get(API_URL);
    const music = response.data.music;
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

export const deleteMusic = async (id: string) => {
  try {
    // Send DELETE request to delete the music by its ID
    const response = await axios.delete(`${API_URL}${id}`);
    console.log("Deleted Music:", response.data);

    // Return success message or deleted item
    return response.data;
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      console.log("Error deleting music:", error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

export const updateMusic = async (
  id: string,
  updatedData: { title: string; artist: string }
) => {
  try {
    // Send PUT request to update the music record by its ID
    const response = await axios.put(`${API_URL}${id}`, updatedData);
    console.log("Updated Music:", response.data);

    // Return updated music data
    return response.data;
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      console.log("Error updating music:", error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

export const addMusic = async (musicData: {
  title: string;
  artist: string;
  imageFile: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("title", musicData.title);
    formData.append("artist", musicData.artist);
    formData.append("image", musicData.imageFile); // Add image file to form data

    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Added Music:", response.data);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error adding music:", error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};
