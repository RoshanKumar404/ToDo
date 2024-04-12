import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import IImage from './components/TheImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoItem {
  id: string;
  title: string;
  dateTime:string
}

export default function MainScreen() {
  const [Writetodo, setWritetodo] = useState<string>('');
  const [todolist, setTodolist] = useState<TodoItem[]>([]);
  const [editTodo, setEditedto] = useState<TodoItem | null>(null); // Type annotation for editTodo

  const editHandler = (Writetodo: TodoItem) => {
    setEditedto(Writetodo);
    setWritetodo(Writetodo.title);
  }
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todolist');
      if (storedTodos !== null) {
        setTodolist(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error while loading todos", error);
    }
  }

  const saveTodos = async (todolist: any) => {
    try {
      await AsyncStorage.setItem('todolist', JSON.stringify(todolist));
    } catch (error) {
      console.error('Error saving todos', error);
    }
  };


  useEffect(() => {
    loadTodos()
  }, [])


  const handleEditTodo = async () => {
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
      saveTodos(updatedTodoList)
      
      
    } else {
      Alert.alert("Enter the task before saving it");
    }
  }
  const handleaddtodo = () => {
    if (Writetodo.trim() !== '') {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
      const hours = String(currentDate.getHours()).padStart(2, '0'); // Add leading zero if needed
      const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Add leading zero if needed
      const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Add leading zero if needed
      
      const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
      
      const newTodo: TodoItem = { id: Date.now().toString(), title: `${Writetodo}`  , dateTime:dateTimeString};
      const updatedToDolist = [...todolist, newTodo];

      updatedToDolist.sort((a, b) => b.id.localeCompare(a.id));
      setTodolist(updatedToDolist);
      setWritetodo('');
      saveTodos(updatedToDolist)
      //setEditedto(null)
     
      

    } else {
      Alert.alert("enter the task before adding it")
    }
  }


  const renderTodo = ({ item }: { item: TodoItem }) => {
    return (
      <View style={styles.Renderaitem}>
        <View style={styles.todoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.dateTime}>{item.dateTime}</Text>
        </View>
        <View style={styles.iconContainer}>
          <IconButton icon="brush" iconColor='#fff' onPress={() => editHandler(item)} />
          <IconButton icon="delete" iconColor='#fff' onPress={() => deletetodo(item.id)} />
        </View>
      </View>
    );
  }

  
  const deletetodo = (id: string) => {
    const handleDeletedTOdo = todolist.filter((Writetodo) => Writetodo.id !== id);
    setTodolist(handleDeletedTOdo);
    saveTodos(handleDeletedTOdo)
  }

  return (
    <View>
      <TextInput
        editable
        multiline
        
        maxLength={410}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#FFF",
  },
  todoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    color: "#E1DA00",
    marginHorizontal: 10,
    fontSize: 18,
  },
  dateTime: {
    color: "#000",
    marginHorizontal:9,
    fontSize: 14,
    
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },


});