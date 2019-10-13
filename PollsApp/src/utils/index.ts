import AsyncStorage from '@react-native-community/async-storage'

export const TOKEN_NAME = '@pollApp_accessToken'

export const setToken = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value)
}

export const getToken = async () => {
  const value = await AsyncStorage.getItem('@pollApp_accessToken')
  if (value) {
    return value
  } else {
    return ''
  }
}

export const removeToken = async () => {
  await AsyncStorage.removeItem('@pollApp_accessToken')
}