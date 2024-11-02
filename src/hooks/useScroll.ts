import { useEffect } from 'react';

export const useScroll = (loading: boolean, callback: () => void) => {
  const handleScroll = () => {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);
};
