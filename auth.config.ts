import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import type { NextAuthConfig } from 'next-auth'
import { signInSchema } from "@/schemas/authSchemas";
import { getUserByEmail } from "@/data/User";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password",  type: "password" }
      },
      async authorize(credentials, req) {
        const validatedFields = signInSchema.safeParse(credentials);

        if(validatedFields.success) {
          const {email,password} = validatedFields.data;
          const user = await getUserByEmail(email);

          if(!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if(passwordMatch) {
            return user;
          }
        }

        return null; // if return null, will be counted as an error
      }
    })
  ],
} satisfies NextAuthConfig;