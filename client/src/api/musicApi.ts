import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchMusic = async () => {
  try {
    const response = await axios.get(API_URL);

    // Check the structure of the response
    if (response.data && Array.isArray(response.data.music)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const music = response.data.music.map((item: any) => ({
        ...item,
        image: `${API_URL}/${item.image}`,
      }));
      console.log("Fetched Music Data:", music);
      return music;
    } else {
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error) {
    // Type assertion to Error
    if (error instanceof Error) {
      console.error("Error fetching music:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return [];
  }
};


export const deleteMusic = async (id: string) => {
  try {
    // Send DELETE request to delete the music by its ID
    const response = await axios.delete(`${API_URL}/${id}`);
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
  updatedData: { title: string; artist: string; imageFile?: File }
) => {
  try {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("artist", updatedData.artist);

    // Append image file if provided
    if (updatedData.imageFile) {
      formData.append("image", updatedData.imageFile);
    }

    // Send PUT request with form data
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type for form data
      },
    });

    console.log("Updated Music:", response.data);
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


export const addMusic = async (
  newMusic: { title: string; artist: string },
  imageFile: File // The image file to be uploaded
) => {
  try {
    // Create a FormData object to send file data along with other form fields
    const formData = new FormData();
    formData.append("title", newMusic.title);
    formData.append("artist", newMusic.artist);
    formData.append("image", imageFile); // Append the image file

    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });

    console.log("Music added successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};
