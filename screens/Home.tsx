import { Text, StyleSheet, View, useColorScheme } from "react-native";
import { getColors } from "../utils/colors";
import { FONTFAMILY } from "../utils/fonts";

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTFAMILY.medium,
          color: colors.black,
        }}
      >
        Welcome to Atmo!
      </Text>
    </View>
  );
};

export default HomeScreen;
