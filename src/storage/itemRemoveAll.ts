// src/storage/itemRemoveAll.ts (Função opcional para limpar TUDO)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEM_COLLECTION } from '@storage/storageConfig';

export async function itemRemoveAll() {
  try {
    await AsyncStorage.removeItem(ITEM_COLLECTION);
  } catch (error) {
    throw error;
  }
}