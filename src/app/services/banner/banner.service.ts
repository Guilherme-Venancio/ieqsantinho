import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { Banner } from 'src/app/models/Banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banner: Banner[] = [new Banner()]
  private bannerSubject: Subject<Banner[]> = new Subject<Banner[]>()

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

  async createdBanner(banner: Banner) {
    const bannersCollection = collection(this.firestore, 'banners');
    const bannersDocRef = doc(bannersCollection, banner.date);
    const banners: Banner = banner
    await setDoc(bannersDocRef, banners);
    // this.setBanner(banners)
  }

  async getBanner() {
    const bannerDocRef = collection(this.firestore, 'banners');
    const docSnap = await getDocs(bannerDocRef)
    if(!docSnap.empty) {
      const banners = [];
      docSnap.forEach((doc) => {
        if(doc.data().banners) {
          doc.data().banners.forEach(element => {
            banners.push(element);
          });
        } else banners.push(doc.data());
      });
      this.setBanner(banners)
    } else {
      console.log("No such document!");
    }
  }

  public setBanner(banner: Banner[]): void {
    this.banner = banner
    this.bannerSubject.next(banner);
  }

  public getBannerEvent(): Observable<Banner[]> {
    return this.bannerSubject.asObservable();
  }
}
