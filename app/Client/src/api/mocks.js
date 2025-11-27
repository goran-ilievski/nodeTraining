// Mock data for testing
const mockUsers = [
  {
    id: 1,
    username: "admin",
    role: "superuser",
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    username: "reviewer1",
    role: "reviewer",
    created_at: "2025-01-02T00:00:00.000Z",
    updated_at: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    username: "guest1",
    role: "guest",
    created_at: "2025-01-03T00:00:00.000Z",
    updated_at: "2025-01-03T00:00:00.000Z",
  },
];

const mockTutorials = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn React fundamentals",
    published: true,
  },
  {
    id: 2,
    title: "Node.js Guide",
    description: "Master Node.js development",
    published: false,
  },
];

let userIdCounter = 4;
let tutorialIdCounter = 3;

// Mock User API
export const mockUserAPI = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  getById: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.id === parseInt(userId));
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  },

  create: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check for duplicate username
    if (mockUsers.some((u) => u.username === userData.username)) {
      throw new Error("Username already exists!");
    }

    const newUser = {
      id: userIdCounter++,
      username: userData.username,
      role: userData.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  update: async ({ userId, userData }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const userIndex = mockUsers.findIndex((u) => u.id === parseInt(userId));

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Check for duplicate username (excluding current user)
    if (
      mockUsers.some(
        (u) => u.username === userData.username && u.id !== parseInt(userId)
      )
    ) {
      throw new Error("Username already exists!");
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      username: userData.username,
      role: userData.role,
      updated_at: new Date().toISOString(),
    };

    return { ...mockUsers[userIndex] };
  },

  delete: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const userIndex = mockUsers.findIndex((u) => u.id === parseInt(userId));

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    mockUsers.splice(userIndex, 1);
    return { message: "User was deleted successfully!" };
  },

  login: async ({ username, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.username === username);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Mock JWT token
    const mockToken = `mock-jwt-token-${user.id}-${Date.now()}`;
    localStorage.setItem("authToken", mockToken);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      token: mockToken,
    };
  },
};

// Mock Tutorial API
export const mockTutorialAPI = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockTutorials];
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const tutorial = mockTutorials.find((t) => t.id === parseInt(id));
    if (!tutorial) {
      throw new Error("Tutorial not found");
    }
    return { ...tutorial };
  },

  create: async (tutorialData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newTutorial = {
      id: tutorialIdCounter++,
      title: tutorialData.title,
      description: tutorialData.description,
      published: tutorialData.published || false,
    };
    mockTutorials.push(newTutorial);
    return newTutorial;
  },

  update: async ({ id, tutorialData }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const tutorialIndex = mockTutorials.findIndex((t) => t.id === parseInt(id));

    if (tutorialIndex === -1) {
      throw new Error("Tutorial not found");
    }

    mockTutorials[tutorialIndex] = {
      ...mockTutorials[tutorialIndex],
      ...tutorialData,
    };

    return { ...mockTutorials[tutorialIndex] };
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const tutorialIndex = mockTutorials.findIndex((t) => t.id === parseInt(id));

    if (tutorialIndex === -1) {
      throw new Error("Tutorial not found");
    }

    mockTutorials.splice(tutorialIndex, 1);
    return { message: "Tutorial was deleted successfully!" };
  },

  deleteAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const count = mockTutorials.length;
    mockTutorials.length = 0;
    return { message: `${count} tutorials were deleted successfully!` };
  },

  findByTitle: async (title) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const results = mockTutorials.filter((t) =>
      t.title.toLowerCase().includes(title.toLowerCase())
    );
    return results;
  },
};
