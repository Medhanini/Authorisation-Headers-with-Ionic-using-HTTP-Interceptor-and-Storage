import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  authenticated = false;
  message = '';
 
  constructor(private http: HttpClient, private storage: Storage) { }
  setAuthState(authenticated) {
    if(authenticated) {
      this.storage.set('my_token', 'myspecialheadertoken').then(() => {
        this.authenticated = true;
      });
    } else {
      this.storage.remove('my_token').then(() => {
        this.authenticated = false;
      });
    }
  }
 
  getSuccessful() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/').subscribe(res => {
      this.message = res['results'][0].name;
    });
  }
 
  getFail() {
    this.http.get('https://notvalid.xy').subscribe(
      res => {}
      ,err => {
        this.message = err.message;
      }
    );
  }
}
