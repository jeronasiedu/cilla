import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "@/shared/config/firebase";
import { ulid } from "ulid";

export const uploadImageToStorage = (
  file: File,
  folder?: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const path = folder ? `${folder}/${ulid()}` : `uploads/${ulid()}`;
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
};
