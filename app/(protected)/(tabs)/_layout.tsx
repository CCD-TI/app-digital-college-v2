// app/(tabs)/_layout.tsx
import TabBar from "@/components/TabBar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol color={color} size={size} name="house.fill" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tienda/index"
        options={{
          title: "Tienda",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity onPress={() => router.navigate("/home")}>
              <IconSymbol
                name="arrow.left"
                color={Colors.yellowDC}
                size={40}
                style={{ marginLeft: 16, marginTop: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
        
      />
      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-box" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity onPress={() => router.navigate("/home")}>
              <IconSymbol
                name="arrow.left"
                color={Colors.yellowDC}
                size={40}
                style={{ marginLeft: 16, marginTop: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
