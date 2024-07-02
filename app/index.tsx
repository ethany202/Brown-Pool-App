import { Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Login from "./login";

export default function Index() {
  return (
    // <ThemedView
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
    // </ThemedView>
    <Login />
  );
}
