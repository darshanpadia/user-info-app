import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://random-data-api.com/api/users/random_user?size=80')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  const user = users[index];

  const handleNext = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.text}>ID: {user.id}</Text>
      <Text style={styles.text}>UID: {user.uid}</Text>
      <Text style={styles.text}>Password: {user.password}</Text>
      <Text style={styles.text}>First Name: {user.first_name}</Text>
      <Text style={styles.text}>Last Name: {user.last_name}</Text>
      <Text style={styles.text}>Username: {user.username}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} disabled={index === 0} />
        <Button title="Next" onPress={handleNext} disabled={index === users.length - 1} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
});
