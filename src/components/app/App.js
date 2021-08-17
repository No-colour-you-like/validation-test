import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import './App.sass';

import BigInput from '../bigInput/BigInput';

const placeholder = {
  surname: 'Фамилия',
  name: 'Имя',
  patronymic: 'Отчество',
  dateOfBirth: 'Дата рождения',
  phoneNumber: 'Мобильный телефон',
  email: 'Email',
  address: 'Адрес постоянной регистрации',
  employerName: 'Название работодателя',
};

const type = {
  text: 'text',
  tel: 'tel',
  date: 'date',
};

const App = () => {
  const [userInfo, setUserInfo] = useState('')
  const [date, setDate] = useState(type.text);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setUserInfo(data);
    alert('Форма валидна, отправляется запрос');
  };

  return (
    <div className='wrapper'>
      <div className='validation'>
        <h1 className='validation__title'>Информация о сотруднике</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <BigInput
            name='userName'
            type={type.text}
            placeholder={placeholder.name}
            register={register}
            style={{ border: errors.userName ? '1px solid red' : '' }}
            errors={errors.userName}
            required
          />
          <BigInput
            name='userSurname'
            type={type.text}
            placeholder={placeholder.surname}
            register={register}
            style={{ border: errors.userSurname ? '1px solid red' : '' }}
            errors={errors.userSurname}
            required
          />
          <BigInput
            name='userPatronymic'
            type={type.text}
            placeholder={placeholder.patronymic}
            register={register}
            style={{ border: errors.userPatronymic ? '1px solid red' : '' }}
            errors={errors.userPatronymic}
          />
          <div className='form__small-inputs'>
            <select className='small-input'>
              <option disabled selected>Пол</option>
              <option value='male'>Мужской</option>
              <option value='female'>Женский</option>
            </select>
            <div className='input-wrapper'>
              <input
                className='small-input'
                style={{ border: errors.dateOfBirth ? '1px solid red' : '' }}
                type={date}
                placeholder={placeholder.dateOfBirth}
                onFocus={() => setDate(type.date)}
                {...register('dateOfBirth', { required: true })}
              />
              {errors.dateOfBirth ? (
                <p className='error-text'>Поле является обязательным</p>
              ) : (
                ''
              )}

            </div>
            <div className='input-wrapper'>
              <InputMask
                className='small-input'
                style={{ border: errors.phoneNumber ? '1px solid red' : '' }}
                mask='+7 999 99 99'
                placeholder={placeholder.phoneNumber}
                {...register('phoneNumber', { required: true })}
              />
              {errors.phoneNumber ? (
                <p className='error-text'>Поле является обязательным</p>
              ) : (
                ''
              )}
            </div>
            <div className='input-wrapper'>
              <input
                className='small-input'
                style={{ border: errors.email ? '1px solid red' : '' }}
                type={type.text}
                placeholder={placeholder.email}
                {...register('email', {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
              />
              {errors.email ? (
                <p className='error-text'>Введен некорректный адрес почты</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <BigInput
            name='address'
            type={type.text}
            placeholder={placeholder.address}
            register={register}
          />
          <BigInput
            name='employerName'
            type={type.text}
            placeholder={placeholder.employerName}
            register={register}
          />
          <button className='submit-btn'>Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default App;
