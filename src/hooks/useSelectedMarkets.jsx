import { markets } from '@/services/fake/markets';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const useSelectedMarkets = () => {
  const { control } = useFormContext();

  const [selectedMarkets, setSelectedMarkets] = useState([]);

  const selectedOptions = useWatch({
    control,
    name: 'selectedMarkets',
  });

  useEffect(() => {
    const filteredMarkets = markets.filter((market) => {
      const isOnline = selectedOptions?.[market.id] === 'online';
      const isOffline = selectedOptions?.[market.id] === 'offline';
      return isOnline || isOffline;
    });
    setSelectedMarkets(filteredMarkets);
  }, [selectedOptions]);

  return selectedMarkets;
};

export default useSelectedMarkets;
