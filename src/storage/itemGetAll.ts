// @storage/itemGetAll.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITEM_COLLECTION } from "./storageConfig";

// Defina uma interface para o formato dos dados que serão salvos
export interface StorageItems {
    pending: string[];
    completed: string[];
}

export async function itemGetAll(): Promise<StorageItems> {
    try {
        const storage = await AsyncStorage.getItem(ITEM_COLLECTION);

        // Se houver dados, faça o parse. Caso contrário, retorne um objeto com arrays vazios.
        const items: StorageItems = storage ? JSON.parse(storage) : { pending: [], completed: [] };
        
        return items;
    } catch (error) {
        // É importante lidar com erros, talvez logar ou lançar uma AppError mais específica
        console.error("Erro ao carregar itens do storage:", error);
        throw error;
    }
}