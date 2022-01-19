import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { collection, Firestore, doc, setDoc } from '@angular/fire/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //***VARIABLES

  //***CONSTRUCTOR
  constructor(private auth: Auth, private db: Firestore) {}

  //***METHODS
  login(email: string, password: string) {
    //(from) CRIA UM OBSERVABLE A PARTIR DE UMA FONTE DE DADOS
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string, payload: User) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((creds) => {
        // (creds) Credências do usuário guardando o id do usuário via propriedade uid em payload
        payload.uid = creds.user.uid;

        // (Collection) criando referencia para coleção users
        const users = collection(this.db, 'users');
        // (doc) criando documento cuja chave é o id do usuário
        const userDoc = doc(users, payload.uid);
        // (setDoc) recebe um documento e define quais sao os dados (usa os dados da interface)
        setDoc(userDoc, payload);
      })
    );
  }

  get user() {
    return user(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserData(user.uid);
        }
        return of(undefined);
      })
    );
  }

  private getUserData(uid: string) {
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(map((data) => data as User));
  }
}
