import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage()

  constructor() { }

  async uploadBlob(blob, path): Promise<any> {
    let urlPhoto = ''
    const storageRef = ref(this.storage, `${path}.webp`);
    const snapshot = await uploadBytes(storageRef, blob)
    urlPhoto = await getDownloadURL(snapshot.ref)
    return urlPhoto
  }
}
