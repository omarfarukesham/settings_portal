import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { Link, useLocation } from 'react-router-dom';
/**
 * Reusable Breadcrumb component.
 * @param {Array} routes - Array of route object. i.e.: {path: '/', label: 'Home'}.
 */
const Breadcrumb = ({ routes = [] }) => {
  const location = useLocation();

  /* Given routes */
  let routeNames = routes;

  /* Auto generated from pathname if not given  */
  if (routeNames.length === 0) {
    /* Default Home */
    // routeNames.push({ path: '/', label: 'Home' });

    const pathnames = location.pathname.split('/');
    let pathname = '';
    pathnames.map((path) => {
      if (path !== '') {
        pathname = pathname + '/' + path;
        routeNames.push({ path: pathname, label: path.replaceAll('-', ' ') });
      }
    });
  }

  return (
    <div className='text-label text-gray-6 fill-gray-6 flex gap-3'>
      {routeNames.map((rNames, key) => (
        <div key={key} className='flex h-7 gap-3 items-center'>
          <Link to={rNames.path} className='capitalize'>
            {rNames.label}
          </Link>
          {routeNames.length - 1 != key && (
            <ArrowRightIcon className='fill-gray-7' />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;

// import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
// import { Link, useLocation } from 'react-router-dom';
// /**
//  * Reusable Breadcrumb component.
//  * @param {Array} routes - Array of route object. i.e.: {path: '/', label: 'Home'}.
//  */
// const Breadcrumb = ({ routes = [] }) => {
//   const location = useLocation();

//   /* Given routes */
//   let routeNames = routes;

//   /* Auto generated from pathname if not given  */
//   if (routeNames.length === 0) {
//     /* Default Home */
//     routeNames.push({ path: '/', label: 'Home' });

//     const pathnames = location.pathname.split('/');
//     let pathname = '';
//     pathnames.map((path) => {
//       if (path !== '') {
//         pathname = pathname + '/' + path;
//         routeNames.push({ path: pathname, label: path.replaceAll('-', ' ') });
//       }
//     });
//   }

//   return (
//     <div className='text-label text-gray-6 fill-gray-6 flex gap-3'>
//       {routeNames.map((rNames, key) => (
//         <div key={key} className='flex h-7 gap-3 items-center'>
//           <Link to={rNames.path} className='capitalize'>
//             {rNames.label}
//           </Link>
//           {routeNames.length - 1 != key && (
//             <ArrowRightIcon className='fill-gray-7' />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Breadcrumb;
