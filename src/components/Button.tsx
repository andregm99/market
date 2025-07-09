
import { TouchableOpacity,TouchableOpacityProps, View} from "react-native";
import { Text } from "@gluestack-ui/themed";
type Props = TouchableOpacityProps &{
    title:string
}

export function Button({title,onPress}:Props){
    return(
        <TouchableOpacity onPress={onPress} >
            <View style={{alignSelf:'center',marginTop:10,marginBottom:20,backgroundColor:'#2C46B1',padding:20,width:342
                ,borderRadius:5 
            }}>
                <Text textAlign="center" color="$white" fontFamily="$heading" fontSize={18}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}