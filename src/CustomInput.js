import React from 'react';
import { useFormContext } from 'react-hook-form';

const CustomInput = ({ name, label, rules, type = 'text', placeholder, className = '', ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Access react-hook-form context

  // Add unique ID for accessibility
  const inputId = `input_${name}`;

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        {...register(name, rules)}
        placeholder={placeholder} // Added placeholder for better UX
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
        aria-invalid={errors[name] ? 'true' : 'false'} // Accessibility improvement
        aria-describedby={`${name}-error`} // Associate error message with the input
        {...rest}
      />
      {errors[name] && (
        <div id={`${name}-error`} className="text-danger">
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
