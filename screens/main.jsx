import *  as React  from 'react';
import {Linking} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import { useEffect,useRef } from 'react';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function Main() {


      const navigationContainerRef = useRef()
 useEffect(() => {
    const handleDeepLink = ({url}) => {
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];

      if (routeName === 'profile') {
        const username = route.split('/')[1];
        // navigation.navigate('Profile', {username});
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({route}) => ({title: route.params.username})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
