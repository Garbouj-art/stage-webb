import Wizard from '@/components/Wizard/Wizard';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export const metadata = {
    title: 'Concepteur de Site Web - ISET Nabeul',
    description: 'Application interactive pour définir votre projet web.',
};

export default function Planner() {
    return (
        <main className={styles.main}>
            <Header />
            <Wizard />
        </main>
    );
}
