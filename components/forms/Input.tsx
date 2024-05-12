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
      <label id={`${id}--label`} htmlFor={id} className="my-2 text-lg w-full">
        {label}
        {required && <span className="text-red-600 mx-1 font-bold">*</span>}
      </label>
      <input
        id={id}
        disabled={disabled}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        className="border w-full border-violet-600 bg-white rounded-md p-2 disabled:bg-violet-100 text-black"
      />
    </>
  );
};