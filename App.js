import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  const user = null;

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
