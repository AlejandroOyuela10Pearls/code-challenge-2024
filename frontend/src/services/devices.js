import axios from "axios";

const deviceApiUrl = import.meta.env.VITE_DEVICE_API_URL;

export const fetchDevice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/get`;
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

export const listByFilters = (searchText, brand, model) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/listBy`;
      console.log(
        `Sending request with searchText: ${searchText}, brand: ${brand}, model: ${model}`
      );
      const response = await axios.get(url, {
        params: {
          serialNumber: "",
          brand: brand || "",
          model: model || "",
          searchText: searchText || "",
        },
      });

      if (Array.isArray(response.data)) {
        resolve(response.data);
      } else {
        reject(response);
      }
    } catch (error) {
      console.error("Error fetching filtered devices:", error);
      reject(error);
    }
  });
};
export const fetchMaintenances = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${deviceApiUrl}/listAll`;
      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        const maintenances = response.data.flatMap(
          (device) => device.maintenances || []
        );
        resolve(maintenances);
      } else {
        reject(response);
      }
    } catch (error) {
      console.error("Error fetching maintenances:", error);
      reject(error);
    }
  });
};
