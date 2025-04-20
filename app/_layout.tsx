import SafeScreen from "@/components/SafeScreen";
import { Stack,useSegments,useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { AuthState } from "@/types/data";





export default function RootLayout() {

  const segments = useSegments();
  const router = useRouter();
  const {checkAuth,user,token} = useAuthStore() as AuthState

  useEffect(()=>{
    checkAuth()
  },[])

  useEffect(()=>{

    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
// check if the user is on the auth screen and if they are signed in
    // if they are signed in, redirect them to the tabs screen
    // if they are not signed in, redirect them to the auth screen
    if (isAuthScreen && isSignedIn) {
      router.replace("/(tabs)");
    } else if (!isAuthScreen && !isSignedIn) {
      router.replace("/(auth)");
    }
  },[user,token,segments])

  return <SafeAreaProvider>
    <SafeScreen>
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>;
    </SafeScreen>
  </SafeAreaProvider>;
}
