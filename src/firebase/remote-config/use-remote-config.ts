'use client';

import { useState, useEffect } from 'react';
import { fetchAndActivate, getAll, isSupported, Value } from 'firebase/remote-config';
import { useRemoteConfig } from '@/firebase';

interface UseRemoteConfigValuesResult {
  values: Record<string, Value> | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch and activate Firebase Remote Config values.
 * It provides the fetched values, loading state, and any errors.
 * 
 * @param defaultValues An object containing the default values for your config parameters.
 * @returns {UseRemoteConfigValuesResult} An object with the config values, loading state, and error.
 */
export function useRemoteConfigValues(defaultValues: { [key: string]: string | number | boolean }): UseRemoteConfigValuesResult {
  const remoteConfig = useRemoteConfig();
  const [values, setValues] = useState<Record<string, Value> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initRemoteConfig = async () => {
      if (!remoteConfig) {
        setError(new Error("Remote Config is not initialized."));
        setIsLoading(false);
        return;
      }
      
      const isSupportedByBrowser = await isSupported();
      if (!isSupportedByBrowser) {
        console.warn("Firebase Remote Config is not supported in this environment.");
        setError(new Error("Remote Config not supported."));
        // Use default values if not supported
        const defaultValsAsValues: Record<string, Value> = {};
        for(const key in defaultValues) {
            defaultValsAsValues[key] = {
                asString: () => String(defaultValues[key]),
                asNumber: () => Number(defaultValues[key]),
                asBoolean: () => Boolean(defaultValues[key]),
                getSource: () => 'default'
            }
        }
        setValues(defaultValsAsValues);
        setIsLoading(false);
        return;
      }

      try {
        // Set default values
        remoteConfig.defaultConfig = defaultValues;
        
        // Set minimum fetch interval for development
        // In production, you might want a higher value (e.g., 3600000 for 1 hour)
        remoteConfig.settings.minimumFetchIntervalMillis = 10000;

        // Fetch and activate the latest config
        const activated = await fetchAndActivate(remoteConfig);
        
        if (activated) {
          console.log('Remote Config: New parameters activated.');
        } else {
          console.log('Remote Config: No new parameters to activate, using cached or default.');
        }
        
        // Get all values
        const allValues = getAll(remoteConfig);
        setValues(allValues);

      } catch (err) {
        console.error("Error fetching or activating Remote Config:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred with Remote Config'));
        // In case of error, you might still want to provide defaults
        const defaultValsAsValues: Record<string, Value> = {};
        for(const key in defaultValues) {
            defaultValsAsValues[key] = {
                asString: () => String(defaultValues[key]),
                asNumber: () => Number(defaultValues[key]),
                asBoolean: () => Boolean(defaultValues[key]),
                getSource: () => 'default'
            }
        }
        setValues(defaultValsAsValues);

      } finally {
        setIsLoading(false);
      }
    };

    initRemoteConfig();
  }, [remoteConfig, defaultValues]); // Rerun if remoteConfig instance changes

  return { values, isLoading, error };
}
