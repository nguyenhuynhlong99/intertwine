import { useEffect, useRef } from 'react';

function useDocumentTitle(title: string) {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = String(originalTitle.current);
    };
  }, [documentDefined, title]);
}

export default useDocumentTitle;
