import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {
  email: string = '';
  password: string = '';
  resultsMessage: string = '';
  accountName: string = '';
  schedule: string[][] = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ];

  days: string[] = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  search() {
    // Fetch data from the API
    fetch('https://66cb41954290b1c4f199e054.mockapi.io/study')
      .then(response => response.json())
      .then(data => {
        this.clearResults();
        const hashedPassword = CryptoJS.SHA256(this.password).toString();
        const user = data.find((person: any) => person.user === this.email && person.pass === hashedPassword);
          console.log(hashedPassword);
        if (user) {
          this.resultsMessage = 'بياناتك صحيحه.';
          this.accountName = `مرحب سياده الدكتور : ${user.subject}`;

          // Fill schedule data
          user.schedule.forEach((item: any) => {
            const dayIndex = this.getDayIndex(item.day);
            if (dayIndex !== undefined) {
                item.times.forEach((time: any, timeIndex: number) => {
                    if (time.material || time.room) {
                        this.schedule[dayIndex][timeIndex] = `المادة: ${time.material || 'لا توجد بيانات'}<br/>الغرفة: ${time.room || 'لا توجد بيانات'}`;
                    } else {
                        this.schedule[dayIndex][timeIndex] = '  ';
                    }
                });
            }
        });
        
        } else {
          this.resultsMessage = 'لا توجد معلومات مرتبطة بهذا البريد الإلكتروني وكلمة المرور.';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.resultsMessage = 'حدث خطأ أثناء جلب البيانات.';
      });
  }

  clearResults() {
    this.resultsMessage = '';
    this.accountName = '';
    this.schedule = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']
    ];
  }

  getDayIndex(day: string): number | undefined {
    const daysMap: { [key: string]: number } = {
      'السبت': 0,
      'الأحد': 1,
      'الإثنين': 2,
      'الثلاثاء': 3,
      'الأربعاء': 4,
      'الخميس': 5
    };
    return daysMap[day];
  }

  downloadPDF() {
    const tableElement = document.getElementById('schedule-table');
    if (tableElement) {
      html2canvas(tableElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('table.pdf');
      });
    } else {
      console.error('العنصر غير موجود: تحقق من الـ ID الخاص بالجدول');
    }
  }
}
