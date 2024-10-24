import axios from "axios";

const userApiUrl = import.meta.env.VITE_USER_API_URL;

export const fetchUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${userApiUrl}/listUsers`;
      const response = await axios.get(url);
      if (response.data.result) {
        resolve(response.data.result);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error fetching users";
      console.error(msg, error);
      reject(msg);
    }
  });
};

export const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${userApiUrl}/save`;
      const response = await axios.post(url, data);
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error creating user";
      console.error(msg, error);
      reject(msg);
    }
  });
};

export const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${userApiUrl}/update?id=${id}`;
      const response = await axios.put(url, data);  
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      const msg = "Error updating user";
      console.error(msg, error);
      reject(msg);
    }
  });
};

export const toggleUserStatus = (id, isActive) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject("User ID is undefined.");
        return;
      }
      const url = `${userApiUrl}/update-status?id=${id}&isActive=${isActive}`;
      const response = await axios.put(url);
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    } catch (error) {
      console.error("Error toggling user status", error);
      reject(error);
    }
  });
};



