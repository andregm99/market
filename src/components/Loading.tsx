import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading (){
    return(
        <Center flex={1} bgColor="$white">
            <Spinner color="$tertiary600"/>
        </Center>
    )
}