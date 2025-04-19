import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, View, Text} from 'react-native';
import 'react-native-url-polyfill/auto'; // For handling deep links

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', {userId: 123})}
      />
    </View>
  );
}

function ProfileScreen({route}) {
  const {userId} = route.params;
  return <Text>Profile Screen for User ID: {userId}</Text>;
}

export default function App() {
  const linking = {
    prefixes: ['myapp://'], // Custom scheme
    config: {
      screens: {
        Home: '',
        Profile: 'profile/:userId', // URL path pattern
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
