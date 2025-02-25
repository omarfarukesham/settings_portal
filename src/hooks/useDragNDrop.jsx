import { useEffect, useRef, useState } from 'react';

const useDragNDrop = (onDrop) => {
  const areaRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      if (areaRef.current.contains(event.target)) {
        const files = Array.from(event.dataTransfer.files);
        onDrop(files);
      }
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragleave', handleDragLeave);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragleave', handleDragLeave);
    };
  }, [onDrop]);

  return { areaRef, isDragging };
};

export default useDragNDrop;
