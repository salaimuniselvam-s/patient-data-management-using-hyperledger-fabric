import { FieldProps } from "formik";
import React, { FC } from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

interface Props extends FieldProps {
  options: Option[];
  placeholder: string;
}

const SelectField: FC<Props> = ({ options, field, form, placeholder }) => {
  const selectedOption =
    options.find((option) => option.value === field.value) || null;

  const handleChange = (option: Option | null) => {
    form.setFieldValue(field.name, option ? option.value : "");
  };

  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
      // styles={{
      //   menu: (provided, state) => ({
      //     ...provided,
      //     maxHeight: "100px", // Set the maximum height of the menu
      //   }),
      // }}
      options={options}
      name={field.name}
      value={selectedOption}
      onChange={handleChange}
      onBlur={field.onBlur}
    />
  );
};

export default SelectField;
