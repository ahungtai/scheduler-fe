import { AppCommonModule } from 'app/app-common/app-common.module';
import { CommonDialogModule } from 'app/main/dialog/common-dialog/common-dialog.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpComponent } from './http/http.component';
import { LogComponent } from './log/log.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRouteName } from 'ts/ng/router/schedule';
import { StatusComponent } from './status/status.component';
import { JobKindsNode } from 'ts/data/node/schedule';
import { ScheduleDialogModule } from 'app/main/dialog/schedule-dialog/schedule-dialog.module';
import { TranslateSourceSchedule as TranslateSourceScheduleOrigin } from 'ts/translate/TranslateSourceSchedule';
import { ScheduleJobService } from 'ts/service/schedule/schedule-job-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ScheduleModule.routes),
    AppCommonModule,
    CommonDialogModule,
    ScheduleDialogModule,
  ],
  declarations: [
    ScheduleComponent,
    HttpComponent,
    StatusComponent,
    LogComponent
  ]
})
export class ScheduleModule {
  public static routes: Routes = [
    {
      path: '', component: ScheduleComponent, children: [
        { path: '', redirectTo: ScheduleRouteName.Http, pathMatch: 'full' },
        { path: ScheduleRouteName.Http, component: HttpComponent },
        { path: ScheduleRouteName.Status, component: StatusComponent },
        { path: ScheduleRouteName.Log, component: LogComponent },
      ]
    }
  ];
  public TranslateSourceSchedule = TranslateSourceScheduleOrigin;

  constructor() {
    if (!JobKindsNode.get()) {
      ScheduleJobService.kind((result) => {
        if (result.success) {
          JobKindsNode.set(result.data);
        } else {
          alert(result.message);
        }
      });
    }
  }
}
