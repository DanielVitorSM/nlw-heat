import { VscGithubInverted } from 'react-icons/vsc'
import { useAuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

export function LoginBox() {
    const { signInUrl, user } = useAuthContext();

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24" />
                Entrar com Github
            </a>
        </div>
    )
}