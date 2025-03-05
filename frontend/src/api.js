const BASE_URL = 'http://localhost:5173';

export const GetAllEvents = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/events?search=${search}&page=${page}&limit=${limit}`;

  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await fetch(url, options);

    // Check if response is not okay (i.e., not 2xx status)
    if (!result.ok) {
      const errorText = await result.text(); // Get the response body as text
      console.error(`HTTP Error: ${result.status} - ${errorText}`);
      throw new Error(`HTTP Error: ${result.status}`);
    }

    const data = await result.json(); // Assuming the response is JSON
    return data;

  } catch (err) {
    console.error("Error fetching events:", err);
    return { error: err.message }; // Return error message for further handling
  }
};
