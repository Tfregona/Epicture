
import { AuthProvider } from './utils/Auth';
import Navigation from './Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation /> 
      </AuthProvider>
    </SafeAreaProvider>
  )
}
