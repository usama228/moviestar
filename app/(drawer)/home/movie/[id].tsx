import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string}>();
    

    
    return(
        <View>
            <Text>Page</Text>
        </View>
    );
};


export default Page;