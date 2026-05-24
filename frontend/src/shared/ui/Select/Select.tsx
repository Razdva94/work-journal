import styles from './select.module.scss';

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
};

export const Select = ({
  value,
  onChange,
  options,
  placeholder = 'Выберите…',
  required,
}: Props) => (
  <select
    className={styles.select}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required={required}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
