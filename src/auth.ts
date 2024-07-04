import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn } = SvelteKitAuth({
  providers: [GitHub({
    authorization: { params: { scope: "gist" } }
  })],
  callbacks: {
    async jwt({ token, account, user, profile, session, trigger }) {
      console.log({
        token, account, user, profile, session, trigger
      });
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user, newSession, trigger }) {
      console.log({
        session, token, user, newSession, trigger
      });
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    }
  }
}); 