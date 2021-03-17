import * as React from "react";
import * as Google from "expo-google-app-auth";
import { StyleSheet, View, Text, Button } from "react-native";
import { setUserProfile } from "../redux/actions/profile";
import { googleLogin } from "../redux/actions/auth";
import { connect } from "react-redux";

const SplashScreen = ({ navigation, setUserProfile, googleLogin }) => {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "606260353641-7ioqhuuoiho24ed2t775cjr07kuihr6g.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        googleLogin(result.idToken);
        setUserProfile(result.user);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Siddhant's skeleton Todo App</Text>
      <Button
        title="Login with Google"
        onPress={() => signInWithGoogleAsync()}
      />
    </View>
  );
};

export default connect(null, { setUserProfile, googleLogin })(SplashScreen);
const styles = StyleSheet.create({});
