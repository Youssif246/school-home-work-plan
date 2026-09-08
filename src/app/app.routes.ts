import { Routes } from '@angular/router';
import { SelectionComponent } from './pages/selection/selection.component';
import { PlanComponent } from './pages/plan/plan.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'select',
    pathMatch: 'full'
  },
  {
    path: 'select',
    component: SelectionComponent,
    title: 'الثانوية العشرون | اختيار الخطة الأسبوعية'
  },
  {
    path: 'plan',
    component: PlanComponent,
    title: 'الثانوية العشرون | عرض الخطة الأسبوعية'
  },
  {
    path: '**',
    redirectTo: 'select'
  }
];
