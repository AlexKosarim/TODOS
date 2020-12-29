import AsyncStorage from '@react-native-community/async-storage';

const setStorageItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const getStorageItem = async (key) => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeStorageItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export { setStorageItem, getStorageItem, removeStorageItem };
