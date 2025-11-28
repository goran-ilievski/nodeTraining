const API_BASE_URL = "http://localhost:8080/api";

// Types
export interface User {
  id: number;
  username: string;
  role: string;
  password?: string;
  created_at: string;
  updated_at: string;
}

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  published: boolean;
}

export interface UserData {
  username: string;
  password: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  role: string;
  token: string;
}

export interface UpdateUserParams {
  userId: string | number;
  userData: Partial<UserData>;
}

export interface UpdateTutorialParams {
  id: string | number;
  tutorialData: Partial<Tutorial>;
}

// User API handlers
export const userAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch users");
    }
    return response.json();
  },

  getById: async (userId: string | number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user");
    }
    return response.json();
  },

  create: async (userData: UserData): Promise<User> => {
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

  update: async ({ userId, userData }: UpdateUserParams): Promise<User> => {
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

  delete: async (userId: string | number): Promise<{ message: string }> => {
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

  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid credentials");
    }

    const data: LoginResponse = await response.json();
    // Store token in localStorage
    localStorage.setItem("authToken", data.token);
    return data;
  },
};

// Tutorial API handlers
export const tutorialAPI = {
  getAll: async (): Promise<Tutorial[]> => {
    const response = await fetch(`${API_BASE_URL}/tutorials`);
    if (!response.ok) {
      throw new Error("Failed to fetch tutorials");
    }
    return response.json();
  },

  getById: async (id: string | number): Promise<Tutorial> => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tutorial");
    }
    return response.json();
  },

  create: async (tutorialData: Partial<Tutorial>): Promise<Tutorial> => {
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

  update: async ({
    id,
    tutorialData,
  }: UpdateTutorialParams): Promise<Tutorial> => {
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

  delete: async (id: string | number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete tutorial");
    }

    return response.json();
  },

  deleteAll: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/tutorials`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete all tutorials");
    }

    return response.json();
  },

  findByTitle: async (title: string): Promise<Tutorial[]> => {
    const response = await fetch(
      `${API_BASE_URL}/tutorials?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search tutorials");
    }
    return response.json();
  },
};
