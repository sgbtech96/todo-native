import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
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
  Thumbnail,
  Spinner,
} from "native-base";
import { connect } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { get, put } from "../utils/request";
import { setUserProfile } from "../redux/actions/profile";
import { handleLogout } from "../redux/actions/auth";
import { setSpinner } from "../redux/actions/spinner";

const TodoScreen = ({
  navigation,
  name,
  imageUrl,
  setUserProfile,
  handleLogout,
  setSpinner,
  spinning,
}) => {
  const isFocused = useIsFocused();
  const [todos, setTodos] = useState([]);
  const handleDelete = async (todoId) => {
    setSpinner(true);
    try {
      const res = await put(`/api/v1/todos/delete/${todoId}`);
      setSpinner(false);
      if (res.type === "success") {
        const tmpTodos = todos.filter((todo) => todo.todoId !== todoId);
        setTodos(tmpTodos);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  const Item = ({ item }) => (
    <Content>
      <Card>
        <CardItem>
          <Body>
            <H3>{item.text}</H3>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button
            iconLeft
            primary
            onPress={() =>
              navigation.navigate("Edit", {
                type: "edit",
                todo: item,
              })
            }
            style={{ marginRight: 8 }}>
            <Icon name="settings" />
            <Text>Edit</Text>
          </Button>
          <Button iconLeft danger onPress={() => handleDelete(item.todoId)}>
            <Icon name="trash" />
            <Text>Delete</Text>
          </Button>
        </CardItem>
      </Card>
    </Content>
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
      // navigation.setOptions({ title: `Hi, ${name}` });
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
      // console.log(res);
      if (res.type === "success") {setTodos(res.data);}
    } catch (e) {
      console.error(e.message);
    }
  };

  return spinning ? (
    <Spinner color="blue" />
  ) : (
    <Container>
      <Header>
        <Body>
          <Title>Hi, {name}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              setSpinner(true);
              handleLogout();
            }}
            style={{ marginRight: 4 }}>
            <Icon name="power" />
          </Button>
          <Thumbnail small source={{ uri: imageUrl }} />
        </Right>
      </Header>
      <Container style={styles.container}>
        <Button
          iconRight
          success
          onPress={() =>
            navigation.navigate("Edit", {
              type: "create",
            })
          }
          style={{ marginBottom: 8 }}>
          <Text>Create a Todo</Text>
          <Icon name="add" />
        </Button>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.todoId}
        />
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { givenName, photoUrl } = state.profile.user.data;
  return {
    name: givenName,
    imageUrl: photoUrl,
    spinning: state.spinning,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
export default connect(mapStateToProps, {
  setUserProfile,
  handleLogout,
  setSpinner,
})(TodoScreen);
