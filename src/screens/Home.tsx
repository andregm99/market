import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { VStack, Heading, Text, Divider } from "@gluestack-ui/themed";
import { CircleDashedIcon, CheckCircleIcon } from "phosphor-react-native";
import { useState, useEffect, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { List } from "@components/List";
import { Filter } from "@components/Filter";

import { itemSave } from "@storage/itemSave";
import { itemGetAll, StorageItems } from "@storage/itemGetAll";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";

type tabOption = 'Pendentes' | 'Comprados'

export function Home() {
    const [name, setName] = useState('');
    const [pendingItems, setPendingItems] = useState<string[]>([]);//Lista de itens pendentes.
    const [completedItems, setCompletedItems] = useState<string[]>([])//Lista de itens comprados.
    const [tabSelected, setTabSelected] = useState<tabOption>('Pendentes')//Estado para alterar entre pendentes e comprados.
    const [isLoading, setIsLoading] = useState(true); // Adicionado estado de carregamento

    // Função para carregar os itens do storage, memorizada com useCallback
    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await itemGetAll(); // Chama a função para obter todos os itens
            setPendingItems(data.pending);
            setCompletedItems(data.completed);
        } catch (error) {
            console.error("Erro ao carregar itens:", error);
            Alert.alert('Erro', 'Não foi possível carregar os itens do storage.');
        } finally {
            setIsLoading(false);
        }
    }, []); // Array de dependências vazio: fetchItems é criada apenas uma vez.

    // Função para salvar os itens no storage, memorizada com useCallback
    const saveItemsToStorage = useCallback(async (newPending: string[], newCompleted: string[]) => {
        try {
            await itemSave({ pending: newPending, completed: newCompleted });
        } catch (error) {
            console.error("Erro ao salvar itens no storage:", error);
            Alert.alert('Erro', 'Não foi possível salvar as alterações.');
        }
    }, []); // Array de dependências vazio: saveItemsToStorage é criada apenas uma vez.

    // Carrega os itens ao montar o componente
    useEffect(() => {
        fetchItems();
    }, [fetchItems]); // fetchItems é uma dependência, mas como é useCallback com [], só muda uma vez.

    async function HandleAddComponent() { // Adicionando item a lista.
        try {
            

            const nameExist = pendingItems.includes(name.trim().toLowerCase()) ||
                              completedItems.includes(name.trim().toLowerCase());

            if (name.trim().length === 0) {
                return Alert.alert('Campo em branco', 'Favor digitar o item.');
            }
            if (nameExist) {
                return Alert.alert('Item já cadastrado!', `O item ${name.trim()} já está na lista.`);
            }

            Alert.alert('Item adicionado', `O item ${name.trim()} foi adicionado`);
            const newPendingItems = [...pendingItems, name.trim()];
            setPendingItems(newPendingItems);
            await saveItemsToStorage(newPendingItems, completedItems); // Salva no storage
            setName('');
            setTabSelected("Pendentes");
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Item', error.message);
            } else {
                Alert.alert('Novo Item', 'Não foi possível adicionar o item.');
                console.error(error);
            }
        }
    }

    async function handleRemoveItem(itemToRemove: string, listType: 'pending' | 'completed') { // Removendo item
        Alert.alert('Remover', `Remover o item ${itemToRemove}?`, [
            {
                text: 'Sim',
                onPress: async () => { // Função assíncrona para usar await
                    let newPending: string[] = [...pendingItems];
                    let newCompleted: string[] = [...completedItems];

                    if (listType === 'pending') {
                        newPending = pendingItems.filter(item => item !== itemToRemove);
                        setPendingItems(newPending);
                    } else {
                        newCompleted = completedItems.filter(item => item !== itemToRemove);
                        setCompletedItems(newCompleted);
                    }
                    await saveItemsToStorage(newPending, newCompleted); // Salva no storage após remoção
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    async function handleRemoveAll() { // limpando lista
        Alert.alert('Limpar Lista', 'Deseja remover todos os itens da lista atual?', [
            {
                text: 'Sim',
                onPress: async () => { // Função assíncrona para usar await
                    if (tabSelected === 'Pendentes') {
                        setPendingItems([]);
                        await saveItemsToStorage([], completedItems); // Salva o estado atualizado
                    } else {
                        setCompletedItems([]);
                        await saveItemsToStorage(pendingItems, []); // Salva o estado atualizado
                    }
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    async function handleToggleItemStatus(itemToMove: string) { // Alterando itens entre listas.
        let newPending: string[] = [...pendingItems];
        let newCompleted: string[] = [...completedItems];

        if (tabSelected === 'Pendentes') {
            // Remove de pendentes e adiciona a comprados
            newPending = pendingItems.filter(item => item !== itemToMove);
            newCompleted = [...completedItems, itemToMove];
        } else {
            // Remove de comprados e adiciona a pendentes.
            newCompleted = completedItems.filter(item => item !== itemToMove);
            newPending = [...pendingItems, itemToMove];
        }

        setPendingItems(newPending);
        setCompletedItems(newCompleted);
        await saveItemsToStorage(newPending, newCompleted); // Salva no storage após toggle
    }

    // Determina qual lista será exibida com base na aba selecionada
    const displayedList = tabSelected === 'Pendentes' ? pendingItems : completedItems;

    return (
        <VStack bgColor="$warmGray300" flex={1}>
            <VStack alignItems="center">
                <Heading
                    alignSelf="center"
                    fontFamily="$body"
                    color="$blue700"
                    fontSize='$xl' marginBottom={40} marginTop={40}
                >
                    App de compras
                </Heading>
                <Input placeholder="O que você precisa comprar?" value={name} onChangeText={setName} />
                <Button title="Adicionar" onPress={HandleAddComponent} />
            </VStack>
            <VStack backgroundColor="$white" flex={1} borderTopLeftRadius={30} borderTopRightRadius={30} marginTop={20} paddingTop={20}>
                <Filter
                    tabSelected={tabSelected}
                    onSelectTab={setTabSelected}
                    onRemoveAll={handleRemoveAll}
                />
                <Divider marginLeft={30} width={350} alignSelf="center" />
                {/* AQUI ESTÁ A MUDANÇA CRÍTICA: assegure-se de que não há espaços entre ) e { */}
                {isLoading ? (
                   <Loading/>
                ) : (
                    <FlatList
                        data={displayedList}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <List
                                key={item}
                                name={item}
                                IconComponent={tabSelected === 'Pendentes' ? CircleDashedIcon : CheckCircleIcon}
                                onChangeList={() => handleToggleItemStatus(item)}
                                onRemove={() => handleRemoveItem(item, tabSelected === 'Pendentes' ? 'pending' : 'completed')}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Text textAlign="center" marginTop={15} fontSize={"$md"}>
                                {tabSelected === 'Pendentes' ? 'Adicione os itens que deseja comprar.' : 'Nenhum item comprado ainda.'}
                            </Text>
                        )}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </VStack>
        </VStack>
    )
}