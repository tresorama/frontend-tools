import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { AUTH_TRUST_HOST } from '$env/static/private';

export const { handle, signIn } = SvelteKitAuth({
  trustHost: AUTH_TRUST_HOST === 'TRUE',
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