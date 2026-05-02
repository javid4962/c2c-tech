import { useEffect, useState } from "react";

const useAsyncData = (fetcher, dependencies = [], initialValue = null) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await fetcher();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
};

export default useAsyncData;

