import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {
  constructor(private router: Router) { }

  grade: string = ""
  week: string = ""
  isTrue: boolean = false

  validateValues(): boolean {
    return this.grade && this.week ? true : false
  }

  onClickViewPlan(grade: string, week: string) {
    if (!this.validateValues()) {
      return alert("يرجى ادخال المرحلة الدراسية ورقم الأسبوع بشكل صحيح")
    }
    this.router.navigate(["/plan"], {
      queryParams: {
        grade: grade,
        week: week
      }
    })
  }
}
