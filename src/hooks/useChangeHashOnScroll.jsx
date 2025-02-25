import { uploadProductSteps } from '@/pages/upload-product/uploadProductSteps';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//* This is not reusable yet. Make reusable if needed in future
// Take sections, threshold, rootMargin etc as parameter
const useChangeHashOnScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const hash = `#${entry?.target.id}`;
          if (location.hash !== hash) {
            navigate({ ...location, hash });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: document.querySelector('#upload-product-form'),
      rootMargin: '-15% 0px -83% 0px',
      threshold: 0,
    });

    const sections = document.querySelectorAll(
      uploadProductSteps.map((step) => `#${step.path}`),
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location, navigate]);
};

export default useChangeHashOnScroll;
