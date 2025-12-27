// contexts/LocalJobContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LocalJobFormData } from "@/lib/schemas/localJobSchema";
import { TLocalJob } from "@/types/localJob";

interface LocalJobContextType {
  localJobs: TLocalJob[];
  fetchLocalJobs: () => Promise<void>;
  createLocalJob: (data: LocalJobFormData) => Promise<any>;
  updateLocalJob: (id: string, data: LocalJobFormData) => Promise<void>;
  deleteLocalJob: (id: string) => Promise<void>;
}

const LocalJobContext = createContext<LocalJobContextType | undefined>(
  undefined
);

export function LocalJobProvider({ children }: { children: ReactNode }) {
  const [localJobs, setLocalJobs] = useState<TLocalJob[]>([]);

  const fetchLocalJobs = async () => {
    const res = await fetch("/api/jobs");
    if (res.ok) {
      const data = await res.json();
      console.log("API Fetched local jobs:", data);
      setLocalJobs(data);
    }
  };

  const createLocalJob = async (data: LocalJobFormData) => {
    console.log("Creating Add Job with data:", data);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`createLocalJob failed: ${res.status} ${text}`);
    }
    const responseData = await res.json();
    // refresh list after successful create
    await fetchLocalJobs();
    return responseData;
  };

  const updateLocalJob = async (id: string, data: LocalJobFormData) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`updateLocalJob failed: ${res.status} ${text}`);
    }
    await fetchLocalJobs();
  };

  const deleteLocalJob = async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchLocalJobs();
    }
  };

  useEffect(() => {
    fetchLocalJobs();
  }, []);

  return (
    <LocalJobContext.Provider
      value={{
        localJobs,
        fetchLocalJobs,
        createLocalJob,
        updateLocalJob,
        deleteLocalJob,
      }}
    >
      {children}
    </LocalJobContext.Provider>
  );
}

export const useLocalJob = () => {
  const context = useContext(LocalJobContext);
  if (undefined === context) {
    throw new Error("useLocalJob must be used within a LocalJobProvider");
  }
  return context;
};
