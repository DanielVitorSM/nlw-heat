import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

import { api } from '../services/api'

const CLIENT_ID = Constants.manifest?.extra?.GITHUB_CLIENT_ID || ""
const SCOPE = 'read:user'
const USER_STORAGE = '@dowhile:user'
const TOKEN_STORAGE = '@dowhile:token'

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSigning: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthResponse = {
    token: string;
    user: User;
}

type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User | null>(null);
    const [isSigning, setIsSigning] = useState(true);

    useEffect(() => {
        async function loadUserStorageData(){
            const userStorage = await AsyncStorage.getItem(USER_STORAGE)
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

            if(userStorage && tokenStorage){
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
                setUser(JSON.parse(userStorage))
            }

            setIsSigning(false)
        }

        loadUserStorageData()
    }, [])

    async function signIn() {
        try{
            setIsSigning(true)
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
            const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
            
            if(authSessionResponse.type === 'success' && authSessionResponse.params.error != 'access_denied'){
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code })
                const { user, token } = authResponse.data as AuthResponse

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
                await AsyncStorage.setItem(TOKEN_STORAGE, token)
                setUser(user)
            }
        }catch(err){
            console.log(err)
        }finally{
            setIsSigning(false)
        }

    }

    async function signOut() {
        setUser(null)
        await AsyncStorage.removeItem(USER_STORAGE)
        await AsyncStorage.removeItem(TOKEN_STORAGE)
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user,
                isSigning
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}