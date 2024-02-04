import { ChangeEvent, useState } from 'react';
import useShowToast from './useShowToast';

function useImgPreview() {
  const [imgPreview, setImgPreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const { showToast } = useShowToast();

  function handleImgChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast('Invalid file type', 'Please select an image file', 'error');
      setImgPreview(null);
    }
  }

  function resetImgPreview() {
    setImgPreview(null);
  }

  return { imgPreview, handleImgChange, resetImgPreview };
}

export default useImgPreview;
