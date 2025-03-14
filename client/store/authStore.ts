import { create } from "zustand"

interface AuthState {
  email: string
  password: string
  firstName: string
  lastName: string
  birthDate: Date
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setBirthDate: (birthDate: Date) => void
  registerUser: () => Promise<{ success: boolean; message: string }>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: new Date(),
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

     
      const response = await fetch("http://192.168.1.11:3000/auth/register", {
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
}))

