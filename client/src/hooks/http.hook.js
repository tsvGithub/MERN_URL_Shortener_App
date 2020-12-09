import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const request = useCallback(async (url, method = "GET", body, headers = {}) => {
  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    // console.log(url); => /api/auth/register
    console.log(`10 http.hook url, body, headers${(url, body, headers)}`);
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        console.log(`15 http.hook body.json.stringify: ${body}`);
        headers["Content-Type"] = "application/json";
      }
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const data = await response.json();
      console.log(`24 http.hooks 'data' await response.json: ${data}`);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      return data;
    } catch (error) {
      // console.log("Catch ", error.message);
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
