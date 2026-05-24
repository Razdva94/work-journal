import styles from './button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline' | 'danger' | 'link';
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: Props) => (
  <button
    type={type}
    className={`${styles.btn} ${styles[variant]} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
