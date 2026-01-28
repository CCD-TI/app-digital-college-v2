import { Colors } from "@/constants/Colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const style = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000000",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

const visibleTabs = ["home/index", "tienda/index", "perfil/index"];

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const filteredRoutes = state.routes.filter((route) =>
    visibleTabs.includes(route.name)
  );

  return (
    <View style={style.tabbar}>
      {filteredRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        const isFocused = state.routes[state.index].key === route.key;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const TabBarIcon = options.tabBarIcon;

        return (
          <React.Fragment key={route.key}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: isFocused ? "#179EC1" : "transparent",
                borderRadius: 12,
                paddingVertical: 8,
                paddingHorizontal: isFocused ? 10 : 8,
              }}
            >
              {TabBarIcon &&
                TabBarIcon({
                  color: isFocused ? Colors.background : "#aaa",
                  size: 20,
                  focused: isFocused,
                })}
              {isFocused && (
                <Text
                  style={{
                    color: Colors.background,
                    fontSize: 10,
                    marginLeft: 4,
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>

            {/* Separador */}
            {index < filteredRoutes.length - 1 && (
              <View
                style={{
                  width: 1,
                  height: 25,
                  backgroundColor: "#555",
                  marginHorizontal: 5,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
