import { compare, compareSync } from 'bcrypt';

export const validatePassword = async (
  rawPassword: string,
  hashedPassword: string
) => {
  const isValid = await compare(rawPassword, hashedPassword);
  return isValid;
};

export const validatePasswordSync = (
  rawPassword: string,
  hashedPassword: string
) => {
  return compareSync(rawPassword, hashedPassword);
};
