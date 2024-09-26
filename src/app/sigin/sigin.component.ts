import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent {
  email: string = '';
  password: string = '';
  showError: boolean = false;

  private apiUrl = 'https://66cb41954290b1c4f199e054.mockapi.io/study';
  private user: string = '';
  private pass: string = '';
  private userofmaster: string = '';

  private user2: string = '';
  private pass2: string = '';
  private userofmaster2: string = '';

  constructor() {
    this.fetchUserData();
  }

  private fetchUserData(): void {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.length > 0) {
          this.user = jsonData[0].user;
          this.userofmaster = jsonData[0].username;
          this.pass = jsonData[0].pass;


          this.user2 = jsonData[1].user;
          this.userofmaster2 = jsonData[1].username;
          this.pass2 = jsonData[1].pass;
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  onSubmit(): void {
    const hashedPassword = CryptoJS.SHA256(this.password).toString();

    if (this.email === this.user && hashedPassword === this.pass) {
      localStorage.setItem('token', this.userofmaster);
      window.location.href = ' ';
    } else if(this.email === this.user2 && hashedPassword === this.pass2) {

      localStorage.setItem('token', this.userofmaster2);
      window.location.href = ' ';

    }else{
      this.showError = true;
    }
  }
}
