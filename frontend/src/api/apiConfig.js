export function apiBaseUrl(routeAPI) {
  if (process.env.NODE_ENV === 'development') {
    return (`http://localhost:3000/${routeAPI}`)
    // return 'http://localhost:3333/users'
  } else {
    return (`https://healthpro-backend.vercel.app/${routeAPI}`)
  }
}