 import { colorTokens } from "@tamagui/themes";
import { Stack } from "expo-router";
 const Layout = () => { 
    return <Stack
    screenOptions={{
      headerStyle:{
         backgroundColor: colorTokens.dark.blue.blue7,
      },
      headerTintColor: '#fff',
    }}></Stack>;
    
 };
 export default Layout;