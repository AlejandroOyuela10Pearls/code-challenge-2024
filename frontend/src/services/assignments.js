import axios from "axios";

const deviceApiUrl = import.meta.env.VITE_DEVICE_API_URL;

export const fetchDeviceAssignments = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/listAssignments`;
      const response = await axios.get(url, {
        params: {
          id,
        },
      });
      if (response.data) {
        resolve(response.data);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error fetching devices";
      console.error(msg, error);
      reject(msg);
    }
  });
};
