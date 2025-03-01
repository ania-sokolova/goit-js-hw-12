import axios from "axios";

const apiKey = "48848365-f4e25352a2e58b0aa69d4606d";
const baseUrl = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 40) {
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data; 
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}