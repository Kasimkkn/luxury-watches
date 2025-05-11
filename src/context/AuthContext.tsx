
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  {
    id: "1",
    email: "admin@gmail.com",
    phone: "+1234567890",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: new Date().toISOString(),
    password: "admin123" // For demo purposes only
  },
  {
    id: "2",
    email: "user@example.com",
    phone: "+0987654321",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: new Date().toISOString(),
    password: "password123" // For demo purposes only
  }
] as const;

interface AuthContextType extends AuthState {
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  signUp: (data: SignUpData) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (emailOrPhone: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

export interface SignUpData {
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  const [pendingSignUp, setPendingSignUp] = useState<SignUpData | null>(null);
  const [pendingReset, setPendingReset] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        localStorage.removeItem("user");
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    // Reset any errors
    setAuthState(prev => ({ ...prev, error: null, isLoading: true }));

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email or phone
      const user = mockUsers.find(
        u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
      );

      if (!user) {
        setAuthState(prev => ({
          ...prev,
          error: "Invalid credentials",
          isLoading: false
        }));
        toast({
          title: "Login failed",
          description: "Invalid email/phone or password",
          variant: "destructive"
        });
        return false;
      }

      // Convert to User type (omit password)
      const { password: _, ...userWithoutPassword } = user;
      const authUser = userWithoutPassword as User;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(authUser));

      setAuthState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      toast({
        title: "Login successful",
        description: `Welcome back, ${authUser.firstName}!`
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: "An unexpected error occurred",
        isLoading: false
      }));
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const signUp = async (data: SignUpData): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const userExists = mockUsers.some(
        u => (data.email && u.email === data.email) || (data.phone && u.phone === data.phone)
      );

      if (userExists) {
        setAuthState(prev => ({
          ...prev,
          error: "User already exists",
          isLoading: false
        }));
        toast({
          title: "Signup failed",
          description: "User with this email or phone already exists",
          variant: "destructive"
        });
        return false;
      }

      // Store pending signup for OTP verification
      setPendingSignUp(data);

      toast({
        title: "OTP sent",
        description: "Please check your email/phone for the verification code"
      });

      // Navigate to OTP page
      navigate("/verify-otp");
      return true;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, we would verify the OTP with the backend
      // For demo, we'll accept any 6-digit OTP
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        if (pendingSignUp) {
          // Create new user
          const newUser: User = {
            id: `user-${Date.now()}`,
            email: pendingSignUp.email,
            phone: pendingSignUp.phone,
            firstName: pendingSignUp.firstName,
            lastName: pendingSignUp.lastName,
            role: 'user',
            createdAt: new Date().toISOString()
          };

          localStorage.setItem("user", JSON.stringify(newUser));

          setAuthState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          setPendingSignUp(null);

          toast({
            title: "Account created",
            description: "Your account has been created successfully"
          });

          navigate("/profile");
          return true;
        } else if (pendingReset) {
          // Password reset flow
          toast({
            title: "OTP verified",
            description: "Please set your new password"
          });

          navigate("/set-password");
          return true;
        }
      }

      toast({
        title: "Verification failed",
        description: "Invalid verification code",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const resetPassword = async (emailOrPhone: string): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists
      const userExists = mockUsers.some(
        u => u.email === emailOrPhone || u.phone === emailOrPhone
      );

      if (!userExists) {
        toast({
          title: "Reset failed",
          description: "No account found with this email or phone",
          variant: "destructive"
        });
        return false;
      }

      setPendingReset(emailOrPhone);

      toast({
        title: "OTP sent",
        description: "Please check your email/phone for the verification code"
      });

      navigate("/verify-otp");
      return true;
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, we would verify the old password and set the new one
      // For the demo, we'll just simulate success

      toast({
        title: "Password changed",
        description: "Your password has been updated successfully"
      });
      return true;
    } catch (error) {
      toast({
        title: "Password change failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signUp,
        verifyOtp,
        logout,
        resetPassword,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
