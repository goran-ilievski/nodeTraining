const API_BASE_URL = "http://localhost:8080/api";

// User API handlers
export const userAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch users");
    }
    return response.json();
  },

  getById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user");
    }
    return response.json();
  },

  create: async (userData) => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));
    const apiCall = fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const [response] = await Promise.all([apiCall, delay]);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create user");
    }

    return response.json();
  },

  update: async ({ userId, userData }) => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));
    const apiCall = fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const [response] = await Promise.all([apiCall, delay]);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user");
    }

    return response.json();
  },

  delete: async (userId) => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));
    const apiCall = fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    const [response] = await Promise.all([apiCall, delay]);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete user");
    }

    return response.json();
  },

  login: async (username) => {
    const users = await userAPI.getAll();
    const user = users.find((u) => u.username === username);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return { id: user.id, username: user.username, role: user.role };
  },
};

// Tutorial API handlers
export const tutorialAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tutorials`);
    if (!response.ok) {
      throw new Error("Failed to fetch tutorials");
    }
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tutorial");
    }
    return response.json();
  },

  create: async (tutorialData) => {
    const response = await fetch(`${API_BASE_URL}/tutorials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorialData),
    });

    if (!response.ok) {
      throw new Error("Failed to create tutorial");
    }

    return response.json();
  },

  update: async ({ id, tutorialData }) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorialData),
    });

    if (!response.ok) {
      throw new Error("Failed to update tutorial");
    }

    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete tutorial");
    }

    return response.json();
  },

  deleteAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tutorials`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete all tutorials");
    }

    return response.json();
  },

  findByTitle: async (title) => {
    const response = await fetch(
      `${API_BASE_URL}/tutorials?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search tutorials");
    }
    return response.json();
  },
};
