import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient();
export default function RootLayout() {

  return <QueryClientProvider client={queryClient}><SafeAreaProvider>
    <SafeScreen>
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
    </Stack>;
    </SafeScreen>
  </SafeAreaProvider>
  </QueryClientProvider>
}
