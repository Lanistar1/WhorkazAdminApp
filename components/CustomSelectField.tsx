import React from 'react'

const CustomSelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}) => {
  return (
    <div className="w-full">
      <label className="mb-1 block font-semibold text-[18px] text-[#4B4B56]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full rounded-[12px] border border-zinc-200 bg-white px-4 text-[15px] outline-none focus:border-[#3900DC]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default CustomSelectField
