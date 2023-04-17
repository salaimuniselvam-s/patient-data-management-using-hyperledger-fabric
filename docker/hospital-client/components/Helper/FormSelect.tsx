import { FieldProps } from "formik";
import React, { FC } from "react";
import Select, { StylesConfig } from "react-select";

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
  const customStyles: StylesConfig<Option, false> = {
    control: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Prevent text wrapping
      textOverflow: "ellipsis", // Add ellipsis on overflow
    }),
    placeholder: (base) => ({
      ...base,
      whiteSpace: "nowrap", // Prevent text wrapping
      textOverflow: "ellipsis", // Add ellipsis on overflow
    }),
  };

  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
      id={field.name}
      styles={customStyles}
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
