import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const contentType = response.headers.get("content-type") || "";
        let responseData = null;

        if (contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          const text = await response.text();
          responseData = text ? { message: text } : {};
        }

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          const errorMessage =
            responseData?.message ||
            `Request failed with status ${response.status}`;
          throw new Error(errorMessage);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
