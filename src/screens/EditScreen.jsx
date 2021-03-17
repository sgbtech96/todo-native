import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { post, put } from "../utils/request";

const EditScreen = ({ route, navigation }) => {
  const { type } = route.params;
  let todo;
  if (type === "edit") todo = route.params.todo;
  console.log(todo);
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(e) => {
          setText(e);
        }}
        value={text}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
});
