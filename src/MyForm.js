import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CustomInput from './CustomInput';

const MyForm = () => {
  const methods = useForm({
    mode: 'onTouched', 
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitMessage, setSubmitMessage] = useState(''); 

  const onSubmit = async (data) => {
    setIsSubmitting(true); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitMessage('Form submitted successfully!');
      console.log('Form Data: ', data);
    } catch (error) {
      setSubmitMessage('Form submission failed. Please try again.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <CustomInput
          name="username"
          label="Username"
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Minimum 3 characters' },
          }}
        />
        
        <CustomInput
          name="email"
          label="Email"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid email format',
            },
          }}
        />

        <CustomInput
          name="password"
          label="Password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !methods.formState.isValid} 
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {submitMessage && (
          <div className="submit-message">
            {submitMessage}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default MyForm;
