import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/config";

type UsePostDataReturn<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  post: (payload: any) => Promise<void>;
};

const usePostData = <T,>(url: string): UsePostDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

console.log(API_URL)

  const post = async (payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<T>(`${API_URL}${url}`, payload);
      setData(res.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

export default usePostData;
