import { useState } from 'react';
import axios  from 'axios';


const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchGetData = async (url) => {

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      
      // const jsonData = await response.json();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostData = async (url , body ) => {
    let config = {
        headers: {
          'x-auth-token': "@W#I$X7jlk8!%*dd%4",
        }
      }

    setLoading(true);
    setError(null);

    console.log(">>",url)
  
    try {
      const response = await axios.post(url , body , config);
    
      // const jsonData = await response.json();
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  return { data, loading, error, fetchPostData, fetchGetData };
};

export { useDataFetcher } ;