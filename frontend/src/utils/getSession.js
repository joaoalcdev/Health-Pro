import { isExpired } from "./isExpired";

export function getSession() {
  const { session, user } = JSON.parse(localStorage.getItem("session")) || {};

  if (session && !isExpired(session.session.expires_at)) {
    return {
      session,
      user,
      error: null
    }
  } else {
    localStorage.removeItem("session");

    return {
      session: null,
      user: null,
      error: "Não há sessão válida!"
    }
  }
}