import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "accountant" | "staff" | "viewer";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  hasPermission: (permission: keyof typeof rolePermissions.admin) => boolean;
}

export const rolePermissions: Record<
  AppRole,
  {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canViewReports: boolean;
    canManageUsers: boolean;
    canApprovePayments: boolean;
  }
> = {
  admin: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewReports: true,
    canManageUsers: true,
    canApprovePayments: true,
  },
  accountant: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canApprovePayments: true,
  },
  staff: {
    canCreate: true,
    canEdit: false,
    canDelete: false,
    canViewReports: false,
    canManageUsers: false,
    canApprovePayments: false,
  },
  viewer: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canApprovePayments: false,
  },
};

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchUserRole(userId: string): Promise<AppRole | null> {
  try {
    // Use type assertion to bypass type checking since types may not be generated yet
    const { data, error } = await (supabase as any).rpc("get_user_role", {
      _user_id: userId,
    });
    
    if (error || !data) {
      console.error("Error fetching role:", error);
      return "viewer";
    }
    
    return data as AppRole;
  } catch {
    return "viewer";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user role - use setTimeout to avoid blocking
        setTimeout(async () => {
          const userRole = await fetchUserRole(session.user.id);
          setRole(userRole);
        }, 0);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    // Check current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const userRole = await fetchUserRole(session.user.id);
        setRole(userRole);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  const hasPermission = (
    permission: keyof typeof rolePermissions.admin
  ): boolean => {
    if (!role) return false;
    return rolePermissions[role][permission];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
        signUp,
        signIn,
        signOut,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
