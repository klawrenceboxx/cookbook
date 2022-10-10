import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

const x = "pineapple";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Strawberry");

  const recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=345abc9c&app_key=c6f46d96ebc8d175764e2d01348d3202`;

  useEffect(() => {
    fetch(recipeURL)
      .then((response) => response.json())
      .then((json) => {
        //json.movies unique to this tutorial
        setData(json.hits);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false)); // change loading state
  }, [query]);

  // // Also get call asynchronous function
  // async function getMoviesAsync() {
  //   try {
  //     let response = await fetch(recipeURL);
  //     let json = await response.json();
  //     setData(json.movies);
  //     setLoading(false);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  const updateSearch = (value) => {
    setSearch(value);
  };

  const getSearch = () => {
    setQuery(search);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Display each recipe */}
          <Text style={styles.title}>Cookbook</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>

          {/* Textbox */}
          <Text>Enter Recipe:</Text>
          <TextInput
            placeholder="chicken"
            style={styles.input}
            value={search}
            onChangeText={updateSearch}
            // onChangeText={(value) => setRecipe(value)}
          />
          <Button title="search" onPress={getSearch} />

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
              <Text style={styles.recipeText}>Recipe: {dat.recipe.label}</Text>
              <Text>Calories: {dat.recipe.calories}</Text>
              {/* <Text>{dat.</Text> */}
              {/* <Image source={dat.recipe.image} /> */}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  recipeText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default App;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { StyleSheet, Text, View, TextInput } from "react-native";

// export default function App() {
//   const [name, setName] = useState("shaun");
//   const [age, setAge] = useState("30");

//   return (
//     <View style={styles.container}>
//       <Text>Enter name:</Text>
//       <TextInput
//         placeholder="e.g. John Doe"
//         style={styles.input}
//         onChangeText={(value) => setName(value)}
//       />

//       <Text>Enter age:</Text>
//       <TextInput
//         placeholder="e.g. 99"
//         style={styles.input}
//         onChangeText={(value) => setAge(value)}
//       />

//       <Text style={styles.result}>
//         name: {name}, age: {age}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#777",
//     padding: 8,
//     margin: 10,
//     width: 200,
//   },
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ActivityIndicator,
//   FlatList,
// } from "react-native";

// // get data from this URL!
// const movieURL = "https://reactnative.dev/movies.json";

// const App = () => {
//   // managing state with 'useState'
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState([]);
//   const [description, setDescription] = useState([]);

//   // similar to 'componentDidMount', gets called once
//   useEffect(() => {
//     fetch(movieURL)
//       .then((response) => response.json()) // get response, convert to json
//       .then((json) => {
//         setData(json.movies);
//         setTitle(json.title);
//         setDescription(json.description);
//       })
//       .catch((error) => alert(error)) // display errors
//       .finally(() => setLoading(false)); // change loading state
//   }, []);

//   // Also get call asynchronous function
//   async function getMoviesAsync() {
//     try {
//       let response = await fetch(movieURL);
//       let json = await response.json();
//       setData(json.movies);
//       setTitle(json.title);
//       setDescription(json.description);
//       setLoading(false);
//     } catch (error) {
//       alert(error);
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* While fetching show the indicator, else show response*/}
//       {isLoading ? (
//         <ActivityIndicator />
//       ) : (
//         <View>
//           {/* Title from URL */}
//           <Text style={styles.title}>{title}</Text>
//           {/* Display each movie */}
//           <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
//           <FlatList
//             data={data}
//             keyExtractor={({ id }, index) => id}
//             renderItem={({ item }) => (
//               <View style={{ paddingBottom: 10 }}>
//                 <Text style={styles.movieText}>
//                   {item.id}. {item.title}, {item.releaseYear}
//                 </Text>
//               </View>
//             )}
//           />
//           {/* Show the description */}
//           <Text style={styles.description}>{description}</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 48,
//   },
//   movieText: {
//     fontSize: 26,
//     fontWeight: "200",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//   },
//   description: {
//     textAlign: "center",
//     marginBottom: 18,
//     fontWeight: "200",
//     color: "green",
//   },
// });

// export default App;
