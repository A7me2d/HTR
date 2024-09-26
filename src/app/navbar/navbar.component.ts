import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userdata: any = localStorage.getItem('token')

  

  constructor() { }


isbool:boolean  = false;
isbool2:boolean  = false;


  ngOnInit(): void {
    if(this.userdata !== 'Master Ahmed') {
     this.isbool = true;
      // console.log(this.isbool);
    }
    if (this.userdata !== 'zahra'){
      this.isbool2 = true;
      // console.log(this.userdata);
      // console.log(this.isbool2);
    }else{
      this.isbool = false;
      this.isbool2 = false;
      // console.log("not works")
    }



  }



  logout(){
    localStorage.removeItem('token');
    window.location.href = ' ';
  }


}
