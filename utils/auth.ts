import { hash, compare } from "bcryptjs";

export function isEmailValid(email: string) {
  return !!email && email.includes("@");
}

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(
  plainPassword: string,
  hashPassword: string
) {
  return await compare(plainPassword, hashPassword);
}
