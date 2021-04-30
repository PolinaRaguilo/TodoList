import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

const useData = (url) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setItems(response.data);

      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [url]);

  useEffect(() => {
    getData(url);
  }, [getData, url]);

  return {
    items,
    isLoading,
    getData,
    setItems,
  };
};

export default useData;
