import axios from "axios";

const deviceApiUrl = import.meta.env.VITE_DEVICE_API_URL;

export const fetchDevices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/listAll`;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
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

export const createDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/save`;
      const response = await axios.post(url, data);
      if (response.status === 200) {
        resolve(response);
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

export const updateDevice = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/update?id=${id}`;
      const response = await axios.post(url, data);
      if (response.status === 200) {
        resolve(response);
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
