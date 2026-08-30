import { useCallback, useEffect, useState } from "react";
import * as transactionsApi from "@/features/transactions/api/transactionsApi";
import { getDashboardStats } from "@/features/dashboard/api/dashboardApi";

export function useTransactionsData() {
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState(null);
  const [stats, setStats] = useState({ ingresos: 0, egresos: 0, balance: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const loadList = useCallback(async (targetPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionsApi.listTransactions({
        page: targetPage,
        limit: 10,
      });
      setTransactions(response.data ?? []);
      setMeta(response.meta ?? null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList(page);
  }, [loadList, page, reloadCount]);

  useEffect(() => {
    let active = true;

    getDashboardStats()
      .then((data) => {
        if (!active) return;
        setStats(data.resumenAnual ?? {});
      })
      .catch(() => {
        // Mantiene los totales previos si el resumen falla.
      });

    return () => {
      active = false;
    };
  }, [reloadCount]);

  const refresh = useCallback(() => {
    setReloadCount((count) => count + 1);
  }, []);

  return { transactions, meta, stats, page, setPage, loading, error, refresh };
}