import styles from './input.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  placeholder?: string;
  required?: boolean;
  min?: string;
  step?: string;
};

export const Input = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  min,
  step,
}: Props) => (
  <input
    className={styles.input}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required={required}
    min={min}
    step={step}
  />
);
