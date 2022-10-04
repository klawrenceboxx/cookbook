import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

const movieURL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=345abc9c&app_key=c6f46d96ebc8d175764e2d01348d3202`;

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json())
      .then((json) => {
        //json.movies unique to this tutorial
        setData(json.hits);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(movieURL);
      let json = await response.json();
      setData(json.movies);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Display each movie */}
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
              </View>
            )}
          />
          {data.map((dat) => (
            <View>
              <Text>Recipe: {dat.recipe.label}</Text>
              <Text>Calories: {dat.recipe.calories}</Text>
              {/* <Text>{dat.</Text> */}
              <Image source={dat.recipe.image} />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
