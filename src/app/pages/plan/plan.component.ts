import { Component } from '@angular/core';
import { WeeklyPlanService } from '../../weekly-plan.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  constructor(private wps: WeeklyPlanService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  gradeSubjects: string[] = []
  subjectData: any
  weeklyHomeWork: any
  weeklyPlaneDate: string = ""
  gradeName: string = 'الصف الأول الثانوي'
  weekName: string = 'الأسبوع الأول'
  isLoading: boolean = true;

  ngOnInit() {
    const values = this.getGradeAndWeekFromUrl()
    this.gradeName = this.getGradeLabel(values.grade)
    this.weekName = this.getWeekLabel(values.week)
    this.weeklyPlaneDate = this.wps.getTheWeeklyPlaneDate(values.week)
    this.gradeSubjects = this.wps.getSubjectsByGrade(values.grade)
    this.wps.getWeeklyHomwork(values.grade, values.week).subscribe((data: any) => {
      this.weeklyHomeWork = data.data
      this.subjectData = this.wps.formatLessonsAndHomeWorks(this.gradeSubjects, this.weeklyHomeWork)
      this.isLoading = false;
      this.cdr.detectChanges()
    })
  }

  getGradeLabel(grade: string): string {
    const grades: Record<string, string> = {
      first: 'الصف الأول الثانوي',
      second: 'الصف الثاني الثانوي',
      third: 'الصف الثالث الثانوي'
    };

    return grades[grade] || 'الصف الأول الثانوي';
  }

  getWeekLabel(week: string): string {
    const weeks: Record<string, string> = {
      '1': 'الأسبوع الأول',
      '2': 'الأسبوع الثاني',
      '3': 'الأسبوع الثالث',
      '4': 'الأسبوع الرابع',
      '5': 'الأسبوع الخامس',
      '6': 'الأسبوع السادس',
      '7': 'الأسبوع السابع',
      '8': 'الأسبوع الثامن',
      '9': 'الأسبوع التاسع',
      '10': 'الأسبوع العاشر',
      '11': 'الأسبوع الحادي عشر',
      '12': 'الأسبوع الثاني عشر',
      '13': 'الأسبوع الثالث عشر',
      '14': 'الأسبوع الرابع عشر',
      '15': 'الأسبوع الخامس عشر',
      '16': 'الأسبوع السادس عشر',
      '17': 'الأسبوع السابع عشر',
      '18': 'الأسبوع الثامن عشر'
    };

    return weeks[week] || (week ? `الأسبوع ${week}` : 'الأسبوع الأول');
  }

  getGradeAndWeekFromUrl(): { grade: string, week: string } {
    const params = this.activatedRoute.snapshot.queryParamMap
    return {
      grade: params.get("grade") ?? "",
      week: params.get("week") ?? ""
    }
  }

  printWeeklyPlane(): void {
    window.print()
  }
}
