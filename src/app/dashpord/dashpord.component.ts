import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashpord',
  templateUrl: './dashpord.component.html',
  styleUrls: ['./dashpord.component.scss']
})
export class DashpordComponent implements OnInit {

  assistantName: string = ' ';

  ngOnInit(): void {
    // استرجاع اسم المعيد من localStorage
    const nameFromStorage = localStorage.getItem('token');
    if (nameFromStorage) {
      this.assistantName = nameFromStorage;
    } else {
      // في حال لم يكن موجودًا في localStorage
      this.assistantName = 'اسم المعيد غير موجود';
    }
  }
}