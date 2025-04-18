import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";


interface Props {
  checkAuth: () => Promise<void>;
  user: any,
  logout: () => Promise<void>;
}
export default function Index() {

  const {checkAuth,user,logout} = useAuthStore() as Props

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:30
      }}
    >
      <Text>Hello{" "}{user?.name}</Text>
      <Link style={{marginVertical:20}} href="/(auth)/signup">
        <Text>signup</Text>
      </Link>
      <Link style={{marginVertical:20}} href="/(auth)">
        <Text>Login</Text>
      </Link>
    </View>
  );
}
