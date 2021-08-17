import React from 'react';

const BigInput = ({
  style,
  name,
  type,
  placeholder,
  register,
  required,
  errors,
}) => {
  return (
    <div className='input-wrapper'>
      <input
        className='big-input'
        style={style}
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {errors ? <p className='error-text'>Поле является обязательным</p> : ''}
    </div>
  );
};

export default BigInput;
