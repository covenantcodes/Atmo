import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import WeatherDetailsScreen from "../screens/WeatherDetails";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  WeatherDetails: undefined;
};

const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeatherDetails"
          component={WeatherDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
