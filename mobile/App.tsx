import React from 'react'
import AppLoading from 'expo-app-loading'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { Home } from './src/screens/Home'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/hooks/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  })

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <AuthProvider>
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        style="light"
      />
      <Home />
    </AuthProvider>
  );
}