import validatejs from '../Lib/Validate.js'

const validation = {
    email: {
      presence: {
        message: '^Введите email'
      },
      email: {
        message: '^Введён некорректный email'
      }
    },
    password: {
      presence: {
        message: '^Введите пароль'
      },
      length: {
        minimum: 6,
        message: '^Длина пароля - не меньше 6 символов'
      }
    }
};

export default function validate(fieldName, value) {
    var formValues = {};
    formValues[fieldName] = value;
  
    var formFields = {};
    formFields[fieldName] = validation[fieldName];
  
    const result = validatejs(formValues, formFields);
  
    if (result) {
      return result[fieldName][0];
    }
  
    return '';
}