import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { useAuthContext } from './contexts/auth';

export function App() {
  const { user } = useAuthContext();

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      {
        !!user
        ?
        <SendMessageForm />
        :
        <LoginBox />
      }
    </main>
  )
}