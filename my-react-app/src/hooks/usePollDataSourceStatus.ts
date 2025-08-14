import { useRef, useState, useEffect, useCallback } from "react";
import api from '../lib/axios';
import type { DataSource } from "../styles/dataSource";


interface UsePollDataSourceStatusReturn {
  startPolling: (newSessionId: number, newTotalFiles: number, options?: { force?: boolean }) => void;
  stopPolling: () => void;
  polledDataSources: DataSource[];
  totalNewFiles: number;
  pollError: string | null;
}

export const usePollDataSourceStatus = (
  sessionId: string | number | undefined,
  initialTotalNewFiles: number
): UsePollDataSourceStatusReturn => {
  const [polledDataSources, setDataSources] = useState<DataSource[]>([]);
  const [pollError, setError] = useState<string | null>(null);
  const [totalNewFiles, setTotalNewFiles] = useState<number>(initialTotalNewFiles);

  const pollingActiveRef = useRef<boolean>(false);
  const sessionIdRef = useRef<string | null | number>(sessionId);
  const totalNewFilesRef = useRef<number>(initialTotalNewFiles);
  const emptyRetryCountRef = useRef<number>(0);
  const previousDataSourcesCountRef = useRef<number>(0);
  const MAX_EMPTY_RETRIES = 4;

  const hasReceivedDataRef = useRef<boolean>(false);

  useEffect(() => {
    if (sessionId) {
      console.log(
        "Hook initialized with sessionId:",
        sessionId,
        "and totalNewFiles (ref):",
        totalNewFilesRef.current
      );
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      sessionIdRef.current = sessionId;
    } else {
      console.warn("⚠️ Attempted to update sessionIdRef, but sessionId is undefined.");
    }
  }, [sessionId]);

  const poll = useCallback(async () => {
    if (!pollingActiveRef.current) return;

    try {
      const currentSessionId = sessionIdRef.current;
      if (!currentSessionId) {
        console.warn("⚠️ Polling stopped: Missing sessionId");
        pollingActiveRef.current = false;
        return;
      }

      const response = await api.get<DataSource[]>(`/api/dataSources/${currentSessionId}`);
      const dataSources = response.data || [];
      setDataSources(dataSources);

      console.log("📊 dataSources is:", dataSources);

      if (dataSources.length > 0) {
        hasReceivedDataRef.current = true;

        if (dataSources.length > previousDataSourcesCountRef.current) {
          console.log("📈 New data source(s) detected, resetting grace retry counter.");
          emptyRetryCountRef.current = 0;
          previousDataSourcesCountRef.current = dataSources.length;
        }
      }

      const incompleteFiles = dataSources.filter(
        (file) =>
          file.status !== "Success" &&
          file.status !== "Fail" &&
          file.status !== "Upload Failed" &&
          file.status !== "Processing Failed" &&
          file.status !== "Pending Processing"
      );

      console.log("📊 Incomplete files count:", incompleteFiles.length);
      totalNewFilesRef.current = incompleteFiles.length;
      setTotalNewFiles(incompleteFiles.length);

      // CASE: No data sources yet
      if (dataSources.length === 0) {
        emptyRetryCountRef.current += 1;

        if (emptyRetryCountRef.current >= MAX_EMPTY_RETRIES) {
          console.warn("⛔ Max retries reached. Stopping polling...");
          pollingActiveRef.current = false;
          return;
        }

        console.log(`⏳ No data sources yet. Retry ${emptyRetryCountRef.current}/${MAX_EMPTY_RETRIES}`);
        // setTimeout(poll, 1000);
        return;
      }

      // CASE: All files in terminal states
      if (incompleteFiles.length === 0) {
        emptyRetryCountRef.current += 1;
        if (emptyRetryCountRef.current < MAX_EMPTY_RETRIES) {
          console.log(`🔁 No incomplete files. Grace retry ${emptyRetryCountRef.current}/${MAX_EMPTY_RETRIES}`);
          // setTimeout(poll, 2000);
          return;
        }

        console.log("✅ All files in terminal states. Stopping polling...");
        pollingActiveRef.current = false;

      } else {
        setTimeout(poll, 5000); // Keep polling if there are still incomplete files
      }
    } catch (error: any) {
      console.error("❌ Polling error:", error.message);
      setError(error.message);
    }
  }, []);

  const startPolling = useCallback(
    (newSessionId: number, newTotalFiles: number, options: { force?: boolean } = {}) => {
      const force = options.force || false;

      console.log("📡 startPolling() called with:", newSessionId, newTotalFiles, force);

      if (!newSessionId || (!force && newTotalFiles === 0)) {
        console.log("❌ Polling not started: Missing sessionId or no new files.");
        return;
      }

      if (pollingActiveRef.current) {
        console.log("⚠️ Polling already active. Skipping re-initialization.");
        return;
      }

      console.log("✅ Polling started for sessionId:", newSessionId, "with total files:", newTotalFiles);
      emptyRetryCountRef.current = 0;
      pollingActiveRef.current = true;
      hasReceivedDataRef.current = false;
      previousDataSourcesCountRef.current = 0;
      sessionIdRef.current = newSessionId;
      setTotalNewFiles(newTotalFiles);
      poll();
    },
    [poll]
  );

  const stopPolling = useCallback(() => {
    console.log("🛑 Polling manually stopped.");
    pollingActiveRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      pollingActiveRef.current = false;
      console.log("🔄 Polling stopped on cleanup.");
    };
  }, []);

  return {
    startPolling,
    stopPolling,
    polledDataSources,
    totalNewFiles,
    pollError,
  };
};
