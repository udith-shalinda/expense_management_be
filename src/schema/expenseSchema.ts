import * as yup from 'yup';

export const expenseValidationSchema = yup.object().shape({
  description: yup
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be at most 100 characters')
    .required('Description is required'),

  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),

  date: yup.date().typeError('Must be a valid date').required('Date is required'),

  type: yup.string().required('Type is required'),
});
