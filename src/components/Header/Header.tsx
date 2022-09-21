import styles from './Header.module.css';

import Logo from '../../assets/logo.png';

export function Header() {
    return(
        <header className={styles.headerContainer}>
            <img src={Logo} alt="" />
        </header>
    );
}