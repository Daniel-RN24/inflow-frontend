import { use, useCallback, useEffect, useState } from "react";
import * as conceptsApi from "@/features/concepts/api/conceptsApi";

export function useConcepts() {
  const [concepts, setConcepts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadList = useCallback(async (targetPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await conceptsApi.listConcepts({ page, limit: 10 });
      setConcepts(response.data ?? []);
      setMeta(response.meta ?? null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList(page);
  }, [loadList, page]);

  return { concepts, setConcepts, meta, page, setPage, loading, error };
}
