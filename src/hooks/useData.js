import axios from 'axios';
import { useEffect, useState } from 'react';

const useData = (url) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResult] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setItems(response.data);
      setSearchResult(response.data);

      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getData(url);
  }, []);

  return {
    items,
    isLoading,
    getData,
    setItems,
    searchResults,
    setSearchResult,
  };
};

export default useData;
