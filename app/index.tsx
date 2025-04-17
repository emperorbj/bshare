import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:30
      }}
    >
      <Text>Hello</Text>
      <Link style={{marginVertical:20}} href="/(auth)/signup">
        <Text>signup</Text>
      </Link>
      <Link style={{marginVertical:20}} href="/(auth)">
        <Text>Login</Text>
      </Link>
    </View>
  );
}
