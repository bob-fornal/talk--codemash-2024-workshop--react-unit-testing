import Link from 'next/link';
import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import styles from '@styles/Header.module.css';

type PageTitleProps = { title?: string };

export default function Header({ title = '' }: PageTitleProps) {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {
            title === ''
            ?
            <>
              <Image className={styles.logo} src="/images/code-squid.png" height={48} width={129} alt="code-squid logo" />
              <span className={styles.headerFont}>Dashboard</span>
            </>
            :
            <>
              <Link className={styles.anchor} href="/dashboard">
                <Image className={styles.logo} src="/images/code-squid.png" height={48} width={129} alt="code-squid logo" />
                <span className={styles.headerFont}>Dashboard</span>
              </Link>
              <span className={styles.separator}>&gt;</span>
              <span className={styles.headerFont}>{title}</span>
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
