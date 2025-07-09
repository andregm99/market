import { Input as GluestackInput,InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> 

export function Input(props:Props){
    return(
        <GluestackInput 
            variant="outline"
            size="xl"
            borderRadius={6}
            width={342}
            height={60}
            >
            <InputField 
                placeholderTextColor="$gray300"
                bgColor="$white"
                color="$black"
                {...props}
                
            />
        </GluestackInput>
    )
}