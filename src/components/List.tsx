import {  TouchableOpacity, View } from "react-native"
import { Divider, HStack, VStack,Text } from "@gluestack-ui/themed"
import{TrashIcon,CircleDashedIcon} from "phosphor-react-native"
import { TouchableOpacityProps } from "react-native"
import { ElementType } from "react"

type Props = TouchableOpacityProps & {
    name: string;
    onRemove: () => void;
    onChangeList: () => void;
    IconComponent: ElementType;//rederizando componente.
}


export function List ({name,onRemove,onChangeList,IconComponent}:Props){
    return(
    <>
        <HStack style={{marginTop:10,marginLeft:15}}>

            <TouchableOpacity onPress={onChangeList}>
                <IconComponent style={{marginLeft:10,marginRight:10}}/>
            </TouchableOpacity>

            <Text style={{width:300,fontSize:18}}>{name}</Text>
            
            <TouchableOpacity onPress={onRemove}>
                <TrashIcon/>
            </TouchableOpacity>
        </HStack>
        <Divider style={{marginTop: 15, width:350, alignSelf: 'center', height: 1 }}/>
    </>
    )
}