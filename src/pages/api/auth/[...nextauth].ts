import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth'
import { baseService } from "../../../services/api";
const providers = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            try {
                const { data } = await baseService.post<any, { accessToken: string }>('login', { email: credentials?.username, password: credentials?.password })
                return data;
            } catch (err: any) {
                const errorMessage = err.response.data.error.name
                throw new Error(errorMessage + '&email=' + credentials?.username)
            }
        }
    })
]
export default async function auth(req: any, res: any) {
    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: 'jwt'
        },
        pages: {
            signIn: '/login',
            error: '/login'
        },

        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            session({ session, token }) {
                console.log(session)
                session.accessToken = token
                return session
            }
        },
    })
}
