export const apiBaseUrl2 = 'http://localhost:3333'


export function apiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3333/users'
  } else {
    return 'https://healthpro-backend.vercel.app/users'
  }
}