import styles from './formField.module.scss';

type Props = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

export const FormField = ({ label, children, error }: Props) => (
  <div className={styles.group}>
    <label className={styles.label}>{label}</label>
    {children}
    {error ? <span className={styles.error}>{error}</span> : null}
  </div>
);
