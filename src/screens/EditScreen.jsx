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
} from "native-base";
import { post, put } from "../utils/request";

const EditScreen = ({ route, navigation }) => {
  const { type } = route.params;
  let todo;
  if (type === "edit") todo = route.params.todo;
  const [text, setText] = useState(type === "edit" ? todo.text : "");
  const handleSave = async () => {
    try {
      let res;
      if (type === "create") res = await post(`/api/v1/todos/create`, { text });
      else res = await put(`/api/v1/todos/edit/${todo.todoId}`, { text });
      if (res.type === "success") navigation.navigate("Todo");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
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

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
  },
});
