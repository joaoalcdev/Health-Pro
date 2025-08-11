export function apiBaseUrl(routeAPI) {
  if (process.env.NODE_ENV === 'development') {
    return (`http://localhost:3333/${routeAPI}`)
  } else {
    return (`https://health-pro-bgux.onrender.com/${routeAPI}`)
  }
}