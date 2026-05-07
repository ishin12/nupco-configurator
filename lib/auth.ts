import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

// Demo credentials — no DB lookup needed for auth, works instantly on Vercel
const DEMO_USERS = [
  { id: "admin-nupco", email: "admin@nupco.sa", password: "Admin@2026", name: "Admin User", role: "ADMIN" },
  { id: "user-nupco",  email: "user@nupco.sa",  password: "User@2026",  name: "Regular User", role: "USER"  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "120012001200",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        return user ?? null;
      },
    }),
  ],
});
