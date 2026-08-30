import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook genérico para peticiones asíncronas.
 *
 * Expone `data`, `error`, `loading` y `run` (permite volver a ejecutar
 * la petición manualmente, p. ej. tras guardar un formulario).
 *
 * `run` usa `useCallback` con las dependencias pasadas por el consumidor;
 * al cambiar esas dependencias la petición se dispara de nuevo.
 */
export function useAsync(asyncFn, deps = []) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  // `deps` se recibe por parámetro para activar re-ejecuciones controladas;
  // se propagan tal cual al useCallback.
  /* eslint-disable react-hooks/exhaustive-deps */
  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      if (activeRef.current) setData(result);
      return result;
    } catch (err) {
      if (activeRef.current) setError(err);
    } finally {
      if (activeRef.current) setLoading(false);
    }
  }, deps);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    run();
  }, [run]);

  return { data, error, loading, run };
}