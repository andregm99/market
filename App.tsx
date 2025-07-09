import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Home } from '@screens/Home';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { useFonts } from '@expo-google-fonts/open-sans';
import { Loading } from '@components/Loading';

export default function App() {
  const[fontsLoaded] = useFonts({OpenSans_400Regular,OpenSans_700Bold})
  
  return (
    <GluestackUIProvider config={config}>

      {fontsLoaded?<Home/>: <Loading/>}
      
    </GluestackUIProvider>
  );
}


