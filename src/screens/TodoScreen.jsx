import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { get, put } from "../utils/request";
import { setUserProfile } from "../redux/actions/profile";

const TodoScreen = ({ navigation, name, imageUrl, setUserProfile }) => {
  const isFocused = useIsFocused();
  const [todos, setTodos] = useState([]);
  const handleDelete = async (todoId) => {
    try {
      const res = await put(`/api/v1/todos/delete/${todoId}`);
      if (res.type === "success") {
        const tmpTodos = todos.filter((todo) => todo.todoId !== todoId);
        setTodos(tmpTodos);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const Item = ({ item }) => (
    <View style={styles.todo}>
      <Text style={styles.title}>{item.text}</Text>
      <Button
        title="Edit"
        onPress={() =>
          navigation.navigate("Edit", {
            type: "edit",
            todo: item,
          })
        }
      />
      <Button title="Delete" onPress={() => handleDelete(item.todoId)} />
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
  const fetchMyProfile = async () => {
    try {
      const res = await get(`/api/v1/profile/me`);
      if (res.type === "success") {
        setUserProfile(res.data);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    if (!name) {
      fetchMyProfile();
    } else {
      navigation.setOptions({ title: `Hi, ${name}` });
    }
  }, [name]);
  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused]);

  const fetchTodos = async () => {
    try {
      const res = await get(`/api/v1/todos/all`);
      console.log(res);
      if (res.type === "success") setTodos(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Create a todo"
        onPress={() =>
          navigation.navigate("Edit", {
            type: "create",
          })
        }
      />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.todoId}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { givenName, photoUrl } = state.profile.user.data;
  return {
    name: givenName,
    imageUrl: photoUrl,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginRight: 2,
  },
  todo: {
    marginTop: 6,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  btn: {
    marginRight: 2,
  },
});
export default connect(mapStateToProps, { setUserProfile })(TodoScreen);
