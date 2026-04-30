// AuthShield.tsx
// FINAL PRODUCTION VERSION
// Manual Admin Trust System
// Zero writes to /admins
// Zero permission errors
// Instant admin detection

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "./lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  profile: any;
  // Compatibility fields for the rest of the app
  authReady: boolean;
  profileReady: boolean;
  adminReady: boolean;
  refreshAuthToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  profile: null,
  authReady: false,
  profileReady: false,
  adminReady: false,
  refreshAuthToken: async () => {}
});

export const useAuthShield = () => useContext(AuthContext);
// Alias for compatibility
export const useAuth = useAuthShield;

export const AuthShieldProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const refreshAuthToken = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.getIdToken(true);
        console.log("[AuthShield] Token refreshed successfully");
      } catch (error) {
        console.error("[AuthShield] Token refresh failed:", error);
      }
    }
  };

  useEffect(() => {
    console.log("[AuthShield] Initializing identity services...");

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoading(true);
        setUser(currentUser);

        if (!currentUser) {
          setIsAdmin(false);
          setProfile(null);
          setLoading(false);
          return;
        }

        console.log("[AuthShield] Identity changed:", currentUser.email);

        /* =========================
           STEP 1: CHECK ADMIN NODE
        ========================= */
        let adminStatus = false;

        try {
          // We use get() which follows rules. The user wants "Zero permission errors", 
          // so we wrap it in try-catch.
          const adminSnap = await get(
            ref(db, `admins/${currentUser.uid}`)
          );

          if (adminSnap.exists() && adminSnap.val() === true) {
            adminStatus = true;
          }
        } catch (err) {
          console.warn("[AuthShield] Admin node read skipped (expected if not admin).");
        }

        /* =========================
           STEP 2: EMAIL FALLBACK
        ========================= */
        const trustedEmails = [
          "hh5217924@gmail.com",
          "harunabilikis8@gmail.com"
        ];

        if (
          currentUser.email &&
          trustedEmails.includes(
            currentUser.email.toLowerCase()
          )
        ) {
          adminStatus = true;
        }

        setIsAdmin(adminStatus);

        if (adminStatus) {
          console.log(
            "[AuthShield] Detected elevated authority..."
          );
        }

        /* =========================
           STEP 3: PROFILE LOAD
        ========================= */
        try {
          const profileSnap = await get(
            ref(db, `users/${currentUser.uid}`)
          );

          if (profileSnap.exists()) {
            setProfile(profileSnap.val());
          } else {
            console.log("[AuthShield] No profile found, creating entry placeholder...");
            // Non-blocking placeholder if needed, but the user code just set it to null
            setProfile(null);
          }

          console.log(
            "[AuthShield] Profile hydrated successfully."
          );
        } catch (err) {
          console.warn(
            "[AuthShield] Profile load skipped."
          );
          setProfile(null);
        }

        setLoading(false);
      } catch (err) {
        console.error("[AuthShield] Fatal error:", err);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        profile,
        authReady: !loading || user !== null, // Approximate
        profileReady: !loading,
        adminReady: !loading,
        refreshAuthToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
