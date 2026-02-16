import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { scope: "read:user user:email repo" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (account && profile) {
        // 'profile.id' is the GitHub Numerical ID 
        token.githubId = profile.id.toString();
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.githubId;
      return session
    },
    async signIn({ user, account }: any) {

      try {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sync-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            githubId: user.id,
            email: user.email,
            name: user.name,
            accessToken: account.access_token,
          }),
        }).catch(err => console.error("Async Sync Failed:", err));

        return true; //prevent timeout
      } catch (error) {
        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };