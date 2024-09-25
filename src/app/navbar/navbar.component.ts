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
  ngOnInit(): void {
    console.log(this.userdata)

    if(this.userdata !== 'Master Ahmed') {
     this.isbool = true;
    }else{
      console.log(this.userdata,"kk");
      this.isbool = false;
    }

 

  }



  logout(){
    localStorage.removeItem('token');
    window.location.href = ' ';
  }


}
