import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth'
import { baseService } from "../../../services/api";
export default NextAuth({
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
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

    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.accessToken = user.token
            return Promise.resolve(token)
        },
        session: async ({ session, token }) => {
            session.accessToken = token
            return Promise.resolve(session)
        }
    },

    jwt: {
        secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnX', //use a random secret token here
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: 'development.secret.random',
    session: {
        strategy: 'jwt'
    }
})