import type { Session } from "@auth/sveltekit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  console.log("+layout.server.js => load");

  const session = await event.locals.auth();
  console.log("+layout.server.js => load => session", logSession(session));

  return {
    session,
  };
};

const logSession = (session: Session | null, logSensitiveInfo = false) => {
  if (!session) return session;
  if (logSensitiveInfo) return session;
  return {
    user: session.user,
    expires: session.expires,
  };
};