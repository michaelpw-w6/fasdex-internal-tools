import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// @ts-expect-error - NextAuth compatibility issue with Next.js 15
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
