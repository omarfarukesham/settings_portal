import { useEffect, useState } from 'react';

const useFindPosition = (ref) => {
  const [position, setPosition] = useState({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const top = rect.top <= viewportHeight / 2;
      const bottom = rect.bottom >= viewportHeight / 2;
      const left = rect.left <= viewportWidth / 2;
      const right = rect.right >= viewportWidth / 2;

      setPosition({ top, bottom, left, right });
    }
  }, [ref]);

  return position;
};

export default useFindPosition;
