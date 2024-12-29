"use client";

import { ReactNode, Suspense } from "react";
import { AppProvider } from "@/context/app/AppProvider";
import { Toaster } from "@/components/ui/toaster";

interface ClientWrapperProps {
  children: ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <Suspense>
      <AppProvider>
        <Toaster />
        {children}
      </AppProvider>
    </Suspense>
  );
};
