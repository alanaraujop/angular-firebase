import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { defineBase } from '@angular/core/src/render3';


@Component({
    selector: 'app-root',
    template: `
      <input type="text" #nome  placeholder="nome"/>
      <input type="text" #telefone placeholder="telefone"/>
      <input type="button" (click)="add({nome: nome.value, telefone: telefone.value})"  placeholder="telefone" value="Salvar"/>
        <ul>
            <li *ngFor="let book of books | async">
            <pre>{{ book | json }}</pre>
            </li>
        </ul>
    `
})
export class AppComponent {
    public books: Observable<any[]>;
    private booksCollection: AngularFirestoreCollection<Book>;
    constructor(private db: AngularFirestore) {
      this.booksCollection = db.collection<Book>('books');
      this.books = db.collection('books').valueChanges();
  }
 
  add(_book: Book){
    this.booksCollection.add(_book);
  }
}

class Book{
  nome?:string;
  telefone?:string;
}