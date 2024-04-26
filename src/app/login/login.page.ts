import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ToastService } from '../services/toast/toast.service';
import { Firestore, docData } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UsersService } from '../services/users/users.service';
import { User } from '../models/User';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";
  fullName: string = "";
  birthDate: string = "";
  emailCreated: string = "";
  passwordCreated: string = "";
  fullNameCreated: string = "";
  birthDateCreated: string = "";
  screen: any = 'signin';
  private storage = getStorage()

  constructor(
    private router: Router,
    private auth: Auth,
    private toast: ToastService,
    private firestore: Firestore,
    private usersService: UsersService
  ) { }

  async ngOnInit() { }

  async register() {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, this.emailCreated, this.passwordCreated);
      if (user) {
        const idUser = user.uid;
        const usersCollection = collection(this.firestore, 'Users');
        const userDocRef = doc(usersCollection, idUser);
        const users: User = {
          fullName: this.fullNameCreated,
          email: this.emailCreated,
          birthDate: this.birthDateCreated,
          photo: '../../../assets/logo/1633539455254.jpg'
        }
        await setDoc(userDocRef, users);
        users.id = user.uid
        this.usersService.setUser(users)
        this.router.navigate(['/tabs/tab1']);
      }else {
        this.toast.error('Credenciais inválidas')
      }
    } catch (error) {
      this.toast.error('Credenciais inválidas')
      console.error('Erro no registro:', error);
    }
  }

  async login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((response) => {
        const { user } = response
        const idUser = user.uid
        const userDocRef = doc(this.firestore, 'Users' , idUser);
		    getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              this.usersService.setUser(docSnap.data() as any)
            } else {
              console.log("No such document!");
            }
            this.router.navigate(['/tabs/tab1']);
          })
      })
      .catch((error) => {
        if (error.message?.includes('email')) this.toast.error('E-mail incorreto', 1000)
        if (error.message?.includes('password')) this.toast.error('Senha incorreta', 1000)
        if (error.message?.includes('credential')) this.toast.error('E-mail e senha não condizem', 1000)
      });
  }

  createContact(contact: any): Promise<any> {
    // const imagesCollection = collection(this.firestore, 'Images');
    const banners = [
      {date: '1', url: contact},
      {date: '1', url: contact},
      {date: '1', url: contact},
      {date: '1', url: contact}
    ]
    // return addDoc(imagesCollection, {date: '1', url: contact});
    const document = doc(this.firestore, 'banners', 'bannersData');
    return setDoc(document, {banners: banners});
  }

  getUserProfile() {
		const userDocRef = doc(this.firestore, 'banners/bannersData');
		return docData(userDocRef, { idField: 'id' });
	}

  async uploadBlob() {
    const response = await fetch('../../assets/banners/E-TEMPO-TELAO.png');
    const blob = await response.blob();
    const storageRef = ref(this.storage, 'banners/tempo_telao.png');
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then( url => console.log(url));
    });
  }

  // async logout() {
  //   try {
  //     await signOut();
  //     this.router.navigate(['/login']); // Redirecionar para a página de login após o logout
  //   } catch (error) {
  //     console.error('Erro no logout:', error);
  //   }
  // }
}
