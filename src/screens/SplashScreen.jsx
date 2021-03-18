import * as React from "react";
import * as Google from "expo-google-app-auth";
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { setUserProfile } from "../redux/actions/profile";
import { googleLogin } from "../redux/actions/auth";
import { connect } from "react-redux";
import ENV from "../../config";
import { Container, H2, Text, Button, Icon, Spinner } from "native-base";
import * as Animatable from "react-native-animatable";
import { setSpinner } from "../redux/actions/spinner";

const SplashScreen = ({
  navigation,
  setUserProfile,
  googleLogin,
  setSpinner,
  spinning,
}) => {
  async function signInWithGoogleAsync() {
    setSpinner(true);
    try {
      const result = await Google.logInAsync({
        androidClientId: `${ENV.GOOGLE_ANDROID_CLIENT_ID}`,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        googleLogin(result.idToken);
        setUserProfile(result.user);
        // setSpinner(false);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return spinning ? (
    <Spinner color="blue" />
  ) : (
    <Container style={styles.container}>
      <StatusBar backgroundColor="#410093" barStyle="light-content" />
      <Container style={styles.header}>
        <H2 style={{ color: "#fff" }}>Basic Todo Application</H2>
        <Text style={{ color: "#fff", marginBottom: 24 }}>-By Siddhant Gandhi</Text>
        <Animatable.Image
          animation="bounceIn"
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </Container>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Button primary iconRight onPress={() => signInWithGoogleAsync()}>
          <Text>Login with Google</Text>
          <Icon name="person" />
        </Button>
      </Animatable.View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    spinning: state.spinning,
  };
};
export default connect(mapStateToProps, {
  setUserProfile,
  googleLogin,
  setSpinner,
})(SplashScreen);

const { height } = Dimensions.get("screen");
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#410093",
  },
  header: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#410093",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 80,
  },
  logo: {
    width: height_logo + 15,
    height: height_logo,
  },
});
