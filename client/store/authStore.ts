import { create } from "zustand"

interface AuthState {
  email: string
  password: string
  firstName: string
  lastName: string
  birthDate: Date
  isAuthenticated: boolean
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setBirthDate: (birthDate: Date) => void
  registerUser: () => Promise<{ success: boolean; message: string }>
  loginUser: () => Promise<{ success: boolean; message: string }>
  logoutUser: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: new Date(),
  isAuthenticated: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setBirthDate: (birthDate) => set({ birthDate }),

  registerUser: async () => {
    try {
      const { email, password, firstName, lastName, birthDate } = get()

      if (!email || !password || !firstName || !lastName) {
        return {
          success: false,
          message: "Please fill in all required fields",
        }
      }

      const formattedDate = birthDate.toISOString().split("T")[0]

      const response = await fetch("http://192.168.1.2:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          birthDate: formattedDate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      set({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: new Date(),
      })

      return { success: true, message: "Account created successfully!" }
    } catch (error: any) {
      console.error("Registration error:", error)
      return {
        success: false,
        message: error.message || "An error occurred during registration",
      }
    }
  },

  loginUser: async () => {
    try {
      const { email, password } = get()

      if (!email || !password) {
        return {
          success: false,
          message: "Please fill in all fields",
        }
      }

      const response = await fetch("http://192.168.1.2:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      
      set({ 
        isAuthenticated: true,
        password: "" 
      })

      return { success: true, message: "Login successful!" }
    } catch (error: any) {
      console.error("Login error:", error)
      return {
        success: false,
        message: error.message || "An error occurred during login",
      }
    }
  },

  logoutUser: async () => {
    try {
      const response = await fetch("http://192.168.1.2:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Logout failed");
      }

      set({
        isAuthenticated: false,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: new Date(),
      });

      return { success: true, message: "Logged out successfully" };
    } catch (error: any) {
      console.error("Logout error:", error);
      return {
        success: false,
        message: error.message || "An error occurred during logout",
      };
    }
  },
}));