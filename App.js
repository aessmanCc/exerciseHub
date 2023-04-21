import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as SplashScreen from 'expo-splash-screen';
import data from './exercise.json';


function handleOnPress(urlValue) {
  WebBrowser.openBrowserAsync(urlValue);
}


function HomeScreen({ navigation }) {

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  const [item, setItem] = useState(0);
  const [cost, setCost] = useState(0);

  const [items, setItems] = useState([]);

  const addItem = (item, cost) => {
    setItems([...items, { item, cost }]);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.inputSetting}
          mode="flat"
          placeholder="Enter an item"
          onChangeText={(item) => setItem(item)}
        />
        <TextInput
          style={styles.inputSetting}
          placeholder="Enter the cost"
          onChangeText={(cost) => setCost(cost)}
        />
      </View>
      <TouchableOpacity onPress={() => addItem(item, cost)} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <View style={styles.inlineButtonContainer} >
      <TouchableOpacity onPress={() => {navigation.navigate('Calculations', { items });}} style={styles.buttonP}>
        <Text style={styles.buttonText}>View Total</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Websites');}} style={styles.buttonM}>
        <Text style={styles.buttonText}>View Websites</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.inlineListContainer}>
          <Text style={styles.Equiptcontent}>
            {item.item}  
          </Text>
          <Text style={styles.Equiptcost}>
           ${item.cost}
          </Text>
          </View>
        )}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { items} = route.params;
  const totalCost = items.reduce((acc, curr) => acc + Number(curr.cost), 0);
  return (
    <View style={styles.container}> 
      <Text style={styles.Totalcost}>All item Total: ${totalCost.toFixed(2)}</Text>
      <View style={styles.imageSetting}>
        <Image source={require('./assets/weightRoom.png')} />
      </View >
      <TouchableOpacity onPress={() => { navigation.navigate('Calculator');}} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function WebsiteScreen({ navigation }) {
  
  const renderRow = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={require('./assets/icon.png')} style={styles.icon} />
        </View>
        <View >
          <Text style={styles.items} >{item.title}</Text>
        </View>
        <TouchableOpacity title="Visit" onPress={() => { handleOnPress(item.web) }} style={styles.buttonW}> 
          <Text style={styles.buttonTextW}>Visit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList data={data} renderItem={renderRow} />
      <TouchableOpacity onPress={() => { navigation.navigate('Calculator');}} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
    
  );
  
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Calculator" 
        component={HomeScreen} 
        options={{
          title: 'Workout Equiptment',
          headerStyle: {
            backgroundColor: '#6750A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen 
        name="Calculations" 
        component={DetailsScreen}
        options={{
          title: 'Total Cost',
          headerStyle: {
            backgroundColor: '#6750A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
       <Stack.Screen 
        name="Websites" 
        component={WebsiteScreen}
        options={{
          title: 'Where to buy',
          headerStyle: {
            backgroundColor: '#6750A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  row: {
    borderColor: '#7b7983',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#1f3243',
    borderColor: '#1f3243',
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',

    marginRight: 20,
  },
  icon: {
    height: 45,
    width: 45,
  },
  info: {
    flex: 1,
    paddingLeft: 55,
    paddingRight: 55,
  },
  items: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#122737',
    padding: 10,
  },

  web: {
    color: '#3c4f62',
    fontSize: 16,
    fontStyle: 'italic',
  },

  Equiptcontent: {
    marginRight: 145,
    fontSize: 25,

  },
  Equiptcost: {
    fontSize: 25,

  },
  Totalcost: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  imageSetting: {
    width: 315, 
    height: 420,
  },

  inputSetting: {
    paddingTop: 5, 
    marginTop: 10,
    width: 350,
    height: 40,
    fontSize: 20, 
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    
  },

  inlineButtonContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#6750A4',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonW: {
    backgroundColor: '#9A2FAE',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonM: {
    backgroundColor: '#DB88EA',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  buttonP: {
    backgroundColor: '#9A2FAE',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginRight: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  buttonTextW: {
    fontSize: 18,
    color: "white",
  },
  inlineListContainer: {
    flexDirection: 'row',
    color: '#fff',
    justifyContent: 'space-between',

  },
});
