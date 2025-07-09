import { HStack,Text } from "@gluestack-ui/themed"
import { CircleDashedIcon,CheckCircleIcon } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

type tabOption = 'Pendentes' | 'Comprados'

type Props = TouchableOpacityProps & {
    tabSelected: tabOption; // prop para saber qual aba está selecionada
    onSelectTab: (tab: tabOption) => void;
    onRemoveAll:()=>void
    
}

export function Filter ({onRemoveAll,tabSelected,onSelectTab}:Props){
    return(
         <HStack marginTop={30} marginLeft={25} marginBottom={10}>
                    
                    <TouchableOpacity  style={{flexDirection:'row',marginRight:20,opacity: tabSelected === 'Pendentes' ? 1 : 0.5}} onPress={()=>onSelectTab("Pendentes")} >

                               <CircleDashedIcon/>
                              <Text fontFamily="$body" color="$black" >Pendentes</Text>
                       
                    </TouchableOpacity> 
                       

                    <TouchableOpacity  style={{flexDirection:'row',marginRight:80,opacity: tabSelected === 'Comprados' ? 1 : 0.5}} onPress={() => onSelectTab("Comprados")} >

                            <CheckCircleIcon/>
                            <Text fontFamily="$body" color="$black" >Comprados</Text>

                    </TouchableOpacity> 

                     <TouchableOpacity onPress={onRemoveAll}>
                        <Text>
                            Limpar
                        </Text>
                     </TouchableOpacity>
                    

                </HStack>
    )
}