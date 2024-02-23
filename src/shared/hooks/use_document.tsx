"use client";
import { useEffect, useState } from "react";
import {
  doc,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/shared/config/firebase";
import { normalizeFirebaseError } from "@/shared/utils/errors";
import { toast } from "sonner";

type DocumentType<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useDocument<T>(
  collectionName: string,
  documentId: string,
): DocumentType<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let unsubscribe: Unsubscribe | undefined;

  useEffect(() => {
    function fetchData() {
      try {
        const documentRef = doc(db, collectionName, documentId);
        unsubscribe = onSnapshot(
          documentRef,
          (snapshot: DocumentSnapshot) => {
            if (snapshot.exists()) {
              setData(snapshot.data() as T);
            } else {
              setData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.log(error);
            setError(normalizeFirebaseError(error));
            toast.error(normalizeFirebaseError(error), {
              id: "document-error",
            });
            setLoading(false);
          },
        );
      } catch (error: any) {
        setError(normalizeFirebaseError(error));
        toast.error(normalizeFirebaseError(error), {
          id: "document-error",
        });
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName, documentId]);

  return { data, loading, error };
}

export default useDocument;
