import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-assist',
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.scss']
})
export class AssistComponent implements OnInit {
  apiUrl = 'https://66cb41954290b1c4f199e054.mockapi.io/assistant';
  data: any[] = [];

  userdata: any = localStorage.getItem('token')

  isbool:boolean  = false

  ngOnInit() {
    this.fetchData();

    
    if(this.userdata !== 'Master Ahmed') {
      this.isbool = true;
     }else{
       this.isbool = false;
     }
     
  }

  // Fetch data from API
  fetchData() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(jsonData => {
        this.data = jsonData; // Store data for later use
        this.populateDoctorList(); // Populate the dropdown list with doctor names
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Populate the dropdown list with doctor names
  populateDoctorList() {
    const doctorList = document.getElementById('doctorList');
    if (doctorList) {
      this.data.forEach(doctor => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown-item custom-dropdown-item';
        // link.href = '#';
        link.textContent = doctor.subject;
        link.addEventListener('click', () => this.displayData(doctor.id));
        listItem.appendChild(link);
        doctorList.appendChild(listItem);
      });
    }
  }

  // Function to display data for the specified ID
  displayData(id: string) {
    const item = this.data.find(d => d.id === id);
    const subjectTitle = document.getElementById('subject-title');
    const scheduleTableBody = document.querySelector('#schedule-table tbody');

    if (scheduleTableBody) {
      // تفريغ الجدول قبل ملئه
      scheduleTableBody.innerHTML = '';

      if (item && subjectTitle) {
        subjectTitle.textContent = item.subject;

        item.schedule.forEach((schedule: { day: string | null; times: any[]; }) => {
          const row = document.createElement('tr');
          const dayCell = document.createElement('td');
          dayCell.textContent = schedule.day;
          row.appendChild(dayCell);

          schedule.times.forEach(time => {
            const cell = document.createElement('td');

            // عرض المادة كـ نص
            const materialText = document.createElement('span');
            materialText.textContent = time.material;

            // عرض الغرفة كـ نص
            const roomText = document.createElement('span');
            roomText.textContent = time.room ? ` (غرفة: ${time.room})` : '';

            // حقل إدخال لاسم المادة (مخفي افتراضيًا)
            const inputMaterial = document.createElement('input');
            inputMaterial.type = 'text';
            inputMaterial.value = time.material;
            inputMaterial.className = 'material-input form-control hidden'; // مخفي
            inputMaterial.placeholder = 'اسم المادة';

            // حقل إدخال لرقم الغرفة (مخفي افتراضيًا)
            const inputRoom = document.createElement('input');
            inputRoom.type = 'text';
            inputRoom.value = time.room;
            inputRoom.className = 'room-input form-control hidden'; // مخفي
            inputRoom.placeholder = 'رقم الغرفة';

            // إضافة النصوص الثابتة وحقل الإدخال إلى الخلية
            cell.appendChild(materialText);
            cell.appendChild(roomText);
            cell.appendChild(inputMaterial);
            cell.appendChild(inputRoom);
            row.appendChild(cell);
          });

          scheduleTableBody.appendChild(row);
        });
      } else if (subjectTitle) {
        subjectTitle.textContent = 'لا توجد بيانات لهذا الرقم.';
      }
    }
  }



  deleteDoctor() {
    const doctorNames = this.data.map(doctor => doctor.subject).join('\n');
    const doctorToDelete = prompt(`اختر الدكتور الذي ترغب في حذفه:\n${doctorNames}`);
    
    const doctor = this.data.find(d => d.subject === doctorToDelete);
    if (doctor) {
      fetch(`${this.apiUrl}/${doctor.id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('تم حذف الدكتور بنجاح');
        this.fetchData(); // Refresh the list of doctors
      })
      .catch(error => {
        console.error('حدث خطأ أثناء حذف الدكتور:', error);
        alert('فشل في حذف الدكتور.');
      });
    } else {
      alert('لم يتم العثور على الدكتور.');
    }
  }



  addDoctor() {
    const newDoctorName = prompt('أدخل اسم الدكتور الجديد:');
   
  if (newDoctorName) {
    const newDoctor = {
      subject: newDoctorName,
      schedule: [
        { day: "السبت", times: Array(6).fill({ material: "", room: "" }) },
        { day: "الأحد", times: Array(6).fill({ material: "", room: "" }) },
        { day: "الاثنين", times: Array(6).fill({ material: "", room: "" }) },
        { day: "الثلاثاء", times: Array(6).fill({ material: "", room: "" }) },
        { day: "الاربع", times: Array(6).fill({ material: "", room: "" }) },
        { day: "الخميس", times: Array(6).fill({ material: "", room: "" }) }
      ]
    };

      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDoctor)
      })
      .then(response => response.json())
      .then(data => {
        console.log('تم إضافة الدكتور بنجاح:', data);
        this.fetchData(); // Refresh the list of doctors
      })
      .catch(error => {
        console.error('حدث خطأ أثناء إضافة الدكتور:', error);
        alert('فشل في إضافة الدكتور.');
      });
    }
  }


  // Add this method in your HomeComponent class

editSchedule() {
  // إخفاء النصوص الثابتة وإظهار الحقول القابلة للتعديل
  const materialInputs = document.querySelectorAll<HTMLInputElement>('.material-input');
  const roomInputs = document.querySelectorAll<HTMLInputElement>('.room-input');
  const materialTexts = document.querySelectorAll<HTMLSpanElement>('span');

  materialInputs.forEach(input => {
    input.classList.remove('hidden'); // إظهار حقول الإدخال
  });

  roomInputs.forEach(input => {
    input.classList.remove('hidden'); // إظهار حقول الإدخال
  });

  materialTexts.forEach(text => {
    text.style.display = 'none'; // إخفاء النصوص الثابتة
  });
}



downloadPDF() {
  const doctorName = document.getElementById('subject-title')?.textContent || 'Schedule';
  const tableElement = document.getElementById('schedule-table');

  if (tableElement) {
    // Convert the element to a canvas using html2canvas
    html2canvas(tableElement, {
      scale: 2 // Increase resolution
    }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG
      const pdf = new jsPDF();

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 20, 190, 0); // Adjust dimensions as needed

      pdf.save(`${doctorName}_schedule.pdf`);
    });
  } else {
    console.error('Schedule table element not found.');
  }
}


  // Function to save the updated schedule
  saveSchedule() {
    const subjectTitle = document.getElementById('subject-title')?.textContent;
    const selectedDoctor = this.data.find(d => d.subject === subjectTitle);

    if (selectedDoctor) {
      const updatedSchedule: any[] = [];
      const rows = document.querySelectorAll('#schedule-table tbody tr');

      rows.forEach((row: Element) => {
        const day = (row as HTMLTableRowElement).cells[0].textContent;
        const times: any[] = [];
      
        for (let i = 1; i < (row as HTMLTableRowElement).cells.length; i++) {
          const inputMaterial = (row as HTMLTableRowElement).cells[i].querySelector('.material-input') as HTMLInputElement;
          const inputRoom = (row as HTMLTableRowElement).cells[i].querySelector('.room-input') as HTMLInputElement;
      
          times.push({
            material: inputMaterial.value.trim(),
            room: inputRoom.value.trim()
          });
        }
      
        updatedSchedule.push({ day, times });
      });

      const body = {
        subject: subjectTitle,
        schedule: updatedSchedule
      };

      fetch(`${this.apiUrl}/${selectedDoctor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('تم تحديث البيانات بنجاح:', data);
          alert('تم حفظ الجدول بنجاح!');
        })
        .catch(error => {
          console.error('حدث خطأ أثناء تحديث البيانات:', error);
          alert('فشل في حفظ الجدول.');
        });
    }
  }
}


