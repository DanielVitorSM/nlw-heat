import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface IAuthProvider {
    children: ReactNode;
}

interface IUser {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

interface IAuthContextData {
    user: IUser | null;
    signInUrl: string;
    signOut: () => void;
}

interface IAuthResponse {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=7c33feca26a57c5ce701`
    const [user, setUser] = useState<IUser | null>(null);

    async function signIn(githubCode: string){
        const response = await api.post<IAuthResponse>('authenticate', {
            code: githubCode
        })

        const { token, user } = response.data
        api.defaults.headers.common.authorization = `Bearer ${token}`

        localStorage.setItem('@dowhile:token', token)
        setUser(user)
    }

    function signOut(){
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

        if(token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`
            api.get<IUser>('profile').then(res => {
                setUser(res.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if(hasGithubCode){
            const [urlWithoutCode, githubCode] = url.split('?code=')
            window.history.pushState({}, '', urlWithoutCode)
            signIn(githubCode);
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signOut,
                signInUrl,
                user
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}