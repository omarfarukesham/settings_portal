import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//! This function is only for scroll on load, scrolling behavior is different on scroll in different pages (check ChangeHashOnScroll.jsx)
//! Do not add location as dependency here
const useScrollToSectionOnLoad = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page on each route change
    window.scrollTo(0, 0);

    // Extract the hash from the URL
    const hash = location.hash;

    if (hash) {
      // Wait for the page to finish rendering
      setTimeout(() => {
        // Get the target element using the hash
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          // Scroll to the target element
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useScrollToSectionOnLoad;
