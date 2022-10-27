import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return false;
  }
};

export const matchPassword = async (password: string, savedPassword: string) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
    return false;
  }
};
