export const getTokenFromLocalStorage = () => {
  const session = localStorage.getItem('session');
  const token = session ? JSON.parse(session).session.session : '';
  return token.access_token || '';
};