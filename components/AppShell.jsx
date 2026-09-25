"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Loader from "@/components/ui/Loader/Loader";

const LoadingContext = createContext({ isLoaded: false });

export function useLoading() {
  return useContext(LoadingContext);
}

export default function AppShell({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
    setTimeout(() => setShowLoader(false), 800);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      {children}
    </LoadingContext.Provider>
  );
}
