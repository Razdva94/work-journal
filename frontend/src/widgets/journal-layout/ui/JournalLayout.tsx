import styles from './journalLayout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const JournalLayout = ({ children }: Props) => (
  <div className={styles.page}>
    <header className={styles.header}>
      <h1 className={styles.title}>Журнал работ</h1>
      <p className={styles.subtitle}>
        Учёт выполненных работ на строительном объекте
      </p>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
);
