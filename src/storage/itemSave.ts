// src/storage/itemSave.ts (Para salvar os itens)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEM_COLLECTION } from './storageConfig';
import { StorageItems } from './itemGetAll'; // Importa a interface para garantir o tipo

export async function itemSave(items: StorageItems) {
  try {
    // Converte o objeto de itens para string JSON antes de salvar
    const storage = JSON.stringify(items);
    await AsyncStorage.setItem(ITEM_COLLECTION, storage);
  } catch (error) {
    throw error; // Propaga o erro
  }
}