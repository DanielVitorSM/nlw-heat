import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

import { MessageList } from '../../components/MessageList'
import { SendMessageForm } from '../../components/SendMessageForm'
import { Header } from '../../components/Header'
import { SigninBox } from '../../components/SigninBox'
import { styles } from './styles'
import { useAuth } from '../../hooks/auth'

export function Home() {
    const { user } = useAuth()

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Header />
                <MessageList />

                {
                    user
                    ?
                    <SendMessageForm />
                    :
                    <SigninBox />
                }
            </View>
        </KeyboardAvoidingView>
    )
}
