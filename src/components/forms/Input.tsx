import { FieldProps } from "./Form";

export const Input: React.FC<FieldProps & { required?: boolean }> = ({
  id,
  label,
  name,
  type,
  onChange,
  disabled = false,
  value,
  required = false,
}) => {
  return (
    <>
      <label htmlFor={id} className="mt-5 text-lg">
        {label}
        {required && <span className="text-red-600 mx-1">*</span>}
      </label>
      <input
        id={id}
        disabled={disabled}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        className="border border-violet-600 bg-white rounded-md p-2 disabled:bg-violet-100"
      />
    </>
  );
};
