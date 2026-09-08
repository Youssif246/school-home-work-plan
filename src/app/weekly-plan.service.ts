import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeeklyPlanService {
  constructor(private http: HttpClient) { }

  firstSubjects = [
    'الرياضيات',
    'الأحياء',
    'الكيمياء',
    'الكفايات اللغوية',
    'اللغة الإنجليزية'
  ];

  secondSubjects = [
    'الرياضيات',
    'الأحياء',
    'الكيمياء',
    'الفيزياء',
    'الكفايات اللغوية',
    'اللغة الإنجليزية'
  ];

  thirdSubjects = [
    'الرياضيات',
    'الفيزياء',
    'علوم الأرض والفضاء',
    'الكيمياء',
    'اللغة الإنجليزية'
  ];

  getSubjectsByGrade(grade: string): string[] {
    switch (grade) {
      case "first":
        return this.firstSubjects
      case "second":
        return this.secondSubjects
      case "third":
        return this.thirdSubjects
      default:
        return [];
    }
  }

  formatLessonsAndHomeWorks(gradeSubjects: string[], data: any[]) {
    const weekDays = [
      { name: "الأحد", lesson: "sunLesson", homework: "sunHomework" },
      { name: "الاثنين", lesson: "monLesson", homework: "monHomework" },
      { name: "الثلاثاء", lesson: "tueLesson", homework: "tueHomework" },
      { name: "الأربعاء", lesson: "wedLesson", homework: "wedHomework" },
      { name: "الخميس", lesson: "thuLesson", homework: "thuHomework" }
    ];

    return gradeSubjects.map(subject => {
      const subjectData = data?.find((item: any) => item.subject === subject);

      return {
        subject: subject,
        days: weekDays.map(day => ({
          day: day.name,
          lesson: subjectData ? (subjectData[day.lesson] || '') : '',
          homework: subjectData ? (subjectData[day.homework] || '') : ''
        }))
      };
    });
  }

  getWeeklyHomwork(grade: string, week: string) {
    return this.http.get(
      `https://script.google.com/macros/s/AKfycbxGkJo4BBIVp8is17EY4E4dq3nTTMbciBuYlT5Rm6X-3LekQBKSZ4PX9uR0NEu9gGaB/exec?grade=${grade}&week=${week}`)
  }

}
