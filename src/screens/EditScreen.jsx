import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Body,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Title,
  Input,
  Item,
  Spinner,
} from "native-base";
import { post, put } from "../utils/request";
import { connect } from "react-redux";
import { setSpinner } from "../redux/actions/spinner";

const EditScreen = ({ route, navigation, setSpinner, spinning }) => {
  const { type } = route.params;
  let todo;
  if (type === "edit") {todo = route.params.todo;}
  const [text, setText] = useState(type === "edit" ? todo.text : "");
  const handleSave = async () => {
    setSpinner(true);
    try {
      let res;
      if (type === "create") {res = await post(`/api/v1/todos/create`, { text });}
      else {res = await put(`/api/v1/todos/edit/${todo.todoId}`, { text });}
      setSpinner(false);
      if (res.type === "success") {navigation.navigate("Todo");}
    } catch (e) {
      console.log(e.message);
    }
  };
  return spinning ? (
    <Spinner color="blue" />
  ) : (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Todo")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Create/Edit</Title>
        </Body>
        <Right />
      </Header>
      <Container style={styles.container}>
        <Item style={{ marginBottom: 8 }}>
          <Input
            placeholder="Type your todo..."
            onChangeText={(e) => {
              setText(e);
            }}
            value={text}
          />
        </Item>
        <Button iconRight success onPress={handleSave}>
          <Text>Save Todo</Text>
          <Icon name="save" />
        </Button>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    spinning: state.spinning,
  };
};
export default connect(mapStateToProps, { setSpinner })(EditScreen);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
  },
});
