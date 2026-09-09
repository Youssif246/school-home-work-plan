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

  getTheWeeklyPlaneDate(weekNumber: string): string {
    const weekDates: Record<string, string> = {
      '1': 'من 17/3/1448 هـ إلى 21/3/1448 هـ',
      '2': 'من 24/3/1448 هـ إلى 28/3/1448 هـ',
      '3': 'من 2/4/1448 هـ إلى 6/4/1448 هـ',
      '4': 'من 9/4/1448 هـ إلى 13/4/1448 هـ',
      '5': 'من 16/4/1448 هـ إلى 20/4/1448 هـ',
      '6': 'من 23/4/1448 هـ إلى 27/4/1448 هـ',
      '7': 'من 30/4/1448 هـ إلى 4/5/1448 هـ',
      '8': 'من 7/5/1448 هـ إلى 11/5/1448 هـ',
      '9': 'من 14/5/1448 هـ إلى 18/5/1448 هـ',
      '10': 'من 21/5/1448 هـ إلى 25/5/1448 هـ',
      '11': 'من 28/5/1448 هـ إلى 2/6/1448 هـ',
      '12': 'من 5/6/1448 هـ إلى 9/6/1448 هـ',
      '13': 'من 12/6/1448 هـ إلى 16/6/1448 هـ',
      '14': 'من 19/6/1448 هـ إلى 23/6/1448 هـ',
      '15': 'من 26/6/1448 هـ إلى 1/7/1448 هـ',
      '16': 'من 4/7/1448 هـ إلى 8/7/1448 هـ',
      '17': 'من 11/7/1448 هـ إلى 15/7/1448 هـ',
      '18': 'من 18/7/1448 هـ إلى 22/7/1448 هـ'
    };

    return weekDates[weekNumber]
  }

  getWeeklyHomwork(grade: string, week: string) {
    return this.http.get(
      `https://script.google.com/macros/s/AKfycbxGkJo4BBIVp8is17EY4E4dq3nTTMbciBuYlT5Rm6X-3LekQBKSZ4PX9uR0NEu9gGaB/exec?grade=${grade}&week=${week}`)
  }

}
