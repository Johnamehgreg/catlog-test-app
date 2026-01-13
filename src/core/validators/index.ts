import * as yup from 'yup';

// Regex patterns
const PASSWORD_PATTERNS = {
  specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  number: /[0-9]/,
};

// Common validation messages
const MESSAGES = {
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    length: (min: number, max: number) =>
      `Password must be between ${min} and ${max} characters`,
    specialChar: 'Password must contain at least one special character',
    upperCase: 'Password must contain at least one uppercase letter',
    lowerCase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
  },
  name: {
    required: 'This field is required',
    minLength: (min: number) => `Must be at least ${min} characters`,
  },
  phone_number: {
    required: 'Phone number is required',
    minLength: (min: number) => `Phone number must be at least ${min} digits`,
  },
};

// Password validation schema (reusable)
const passwordSchema = yup.string().required(MESSAGES.password.required);
// .min(8, MESSAGES.password.length(8, 64))
// .max(64, MESSAGES.password.length(8, 64))
// .matches(PASSWORD_PATTERNS.specialChar, MESSAGES.password.specialChar)
// .matches(PASSWORD_PATTERNS.upperCase, MESSAGES.password.upperCase)
// .matches(PASSWORD_PATTERNS.lowerCase, MESSAGES.password.lowerCase)
// .matches(PASSWORD_PATTERNS.number, MESSAGES.password.number);

// Initial values
export const initialValues = {
  login: {
    email: '',
    phone: '',
    password: '',
  },

  createExpense: {
    description: '',
    amount: '',
    amount_paid: '',
    category: '',
    recipient: '',
    currency: '',
    date: '',
  },
};

// Validation schemas
export const validationSchemas = {
  login: yup.object().shape({
    loginType: yup.string(),
    email: yup.string().when('loginType', {
      is: (val: string) => val === 'Email',
      then: schema =>
        schema.email(MESSAGES.email.invalid).required(MESSAGES.email.required),
      otherwise: schema => schema.notRequired(),
    }),
    phone: yup.string().when('loginType', {
      is: (val: string) => val === 'Phone',
      then: schema =>
        schema
          .min(10, MESSAGES.phone_number.minLength(10))
          .required(MESSAGES.phone_number.required),
      otherwise: schema => schema.notRequired(),
    }),
    password: passwordSchema,
  }),

  createExpense: yup.object().shape({
    description: yup.string().required(MESSAGES.name.required),
    amount: yup.number().required(MESSAGES.phone_number.required),
    amount_paid: yup.number().required(MESSAGES.phone_number.required),
    category: yup.string().required(MESSAGES.phone_number.required),
    recipient: yup.string().required(MESSAGES.phone_number.required),
    currency: yup.string().required(MESSAGES.phone_number.required),
    date: yup.string().required('Date is required'),
  }),
};
