import { useCallback, useEffect, useState } from "react";

export default function useQuery<DataType>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataType | undefined>(undefined);

  const fetchResults = useCallback(async() => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const refetch = useCallback(() => {
    fetchResults();
  }, [fetchResults]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);
  
  return {data, isLoading, refetch};
}