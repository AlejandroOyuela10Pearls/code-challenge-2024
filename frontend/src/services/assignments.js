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
      const msg = "Error fetching device assignments";
      console.error(msg, error);
      reject(msg);
    }
  });
};

export const createAssignment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/assign`;
      const response = await axios.post(url, data);
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error creating assignment";
      console.error(msg, error);
      reject(msg);
    }
  });
};

export const updateAssignment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/updateAssignment?id=${id}`;
      const response = await axios.put(url, data);
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error Updating Assignment";
      console.error(msg, error);
      reject(msg);
    }
  });
};
