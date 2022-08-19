import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import * as SecureStorage from "expo-secure-store";

const nhost = new NhostClient({
  subdomain: "snxxhovfktbrxcvpvebr",
  region: "eu-central-1",
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStorage,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NhostReactProvider nhost={nhost}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NhostReactProvider>
    );
  }
}
