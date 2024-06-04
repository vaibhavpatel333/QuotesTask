import { useState, useEffect, useCallback } from "react";

const useQuoteApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formQuoteError, setFormQuoteError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const createQuote = useCallback(async (quoteData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });
      if (!response.ok) {
        if (response.status === 409) {
            setFormQuoteError({message: "Duplicate Quote exist"})
        }
      }
      fetchData(); // Refresh data after creating a new quote
    } catch (error) {
        setError(error)
    }
  }, [url, fetchData]);

  const updateQuote = useCallback(async (quoteData) => {
    try {
      const response = await fetch(`${url}/${quoteData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });
      if (!response.ok) {
        if (response.status === 409) {
            setFormQuoteError({message: "Duplicate Quote exist"})
        }
      }
      fetchData(); // Refresh data after updating the quote
    } catch (error) {
      console.error("Error updating quote:", error.message);
    }
  }, [url, fetchData]);

  const deleteQuote = useCallback(async (quoteId) => {
    try {
      const response = await fetch(`${url}/${quoteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }
      fetchData(); // Refresh data after deleting the quote
    } catch (error) {
      console.error("Error deleting quote:", error.message);
    }
  }, [url, fetchData]);

  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
  }, [fetchData]);

  return { data, loading, error, createQuote, updateQuote, deleteQuote, formQuoteError, setError, setFormQuoteError };
};

export default useQuoteApi;
