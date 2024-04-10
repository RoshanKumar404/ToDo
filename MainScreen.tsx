import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import IImage from './components/TheImage';

interface TodoItem {
  id: string;
  title: string;
}

export default function MainScreen() {
  const [Writetodo, setWritetodo] = useState<string>('');
  const [todolist, setTodolist] = useState<TodoItem[]>([]);
  const [editTodo, setEditedto] = useState<TodoItem | null>(null); // Type annotation for editTodo

  const editHandler = (Writetodo: TodoItem) => {
    setEditedto(Writetodo);
    setWritetodo(Writetodo.title);
  }

  const handleEditTodo = () => {
    if (Writetodo !== '') {
      const updatedTodoList = todolist.map(todo => {
        if (todo.id === editTodo?.id) { // Use optional chaining for editTodo
          return { ...todo, title: Writetodo };
        }
        return todo;
      });

      setTodolist(updatedTodoList);
      setWritetodo('');
      setEditedto(null);
    } else {
      Alert.alert("Enter the task before saving it");
    }
  }

  const renderTodo = ({ item }: { item: TodoItem }) => {
    return (
      <View style={styles.Renderaitem}>
        <Text style={{ color: "#E1DA00", marginHorizontal: 10, fontSize: 18, width: Dimensions.get('window').width * 0.65 }}>{item.title}</Text>
        <IconButton icon="brush" iconColor='#fff' onPress={() => editHandler(item)} />
        <IconButton icon="delete" iconColor='#fff' onPress={() => deletetodo(item.id)} />
      </View>
    );
  }

  const handleaddtodo = () => {
    if (Writetodo !== '') {
      const newTodo: TodoItem = { id: Date.now().toString(), title: Writetodo };
      const updatedToDolist = [...todolist, newTodo];

      updatedToDolist.sort((a, b) => b.id.localeCompare(a.id));
      setTodolist(updatedToDolist);
      setWritetodo('');
      //setEditedto(null)
    } else {
      Alert.alert("enter the task before adding it")
    }
  }

  const deletetodo = (id: string) => {
    const handleDeletedTOdo = todolist.filter((Writetodo) => Writetodo.id !== id);
    setTodolist(handleDeletedTOdo);
  }

  return (
    <View>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={400}
        style={styles.input}
        placeholder='Add your Task '
        value={Writetodo}
        onChangeText={(userText) => setWritetodo(userText)}
      />
      {editTodo ? (
        <TouchableOpacity style={styles.button} onPress={handleEditTodo}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Save Your Task</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleaddtodo}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Add Your Task</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={todolist}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
      />
      {todolist.length <= 0 && <IImage />}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: "#45dea0",
    marginHorizontal: 10,
    borderRadius: 9,
    
  },
  button: {
    backgroundColor: "green",
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 100,
    borderRadius: 6,
    alignItems: "center",
  },
  Renderaitem: {
    backgroundColor: "#1e90ff",
    borderRadius: 9,
    margin: 7,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#FFF"
  },
  

});