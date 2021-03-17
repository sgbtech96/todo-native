import * as React from "react";
import * as Google from "expo-google-app-auth";
import { StyleSheet } from "react-native";
import { setUserProfile } from "../redux/actions/profile";
import { googleLogin } from "../redux/actions/auth";
import { connect } from "react-redux";
import ENV from "../../config";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  H3,
  Text,
  Button,
  Icon,
  Right,
  Title,
} from "native-base";

const SplashScreen = ({ navigation, setUserProfile, googleLogin }) => {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: `${ENV.GOOGLE_ANDROID_CLIENT_ID}`,
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
    <Container>
      <Header>
        <Body>
          <Title>Todo App</Title>
        </Body>
      </Header>

      <Button primary iconRight onPress={() => signInWithGoogleAsync()}>
        <Text>Login/Signup</Text>
        <Icon name="logo-google-plus" />
      </Button>
    </Container>
  );
};

export default connect(null, { setUserProfile, googleLogin })(SplashScreen);
const styles = StyleSheet.create({});
