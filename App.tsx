import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/Home/home';
import CameraPage from './src/component/Camera';
import Login from './src/TelaLogin/TelaIncial';





export default function App({navigation}:any) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='HomePage' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="HomePage" component={HomePage} initialParams={{ capturedImage: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
