export default function routeNameFromPathname(pathname = '') {
  let routeName = pathname.replaceAll('-', ' ').split('/').pop();
  return routeName;
}
