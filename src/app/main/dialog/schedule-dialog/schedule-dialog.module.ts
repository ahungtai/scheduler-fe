import { CommonModule } from '@angular/common';
import { HttpDialogComponent } from 'app/main/dialog/schedule-dialog/http-dialog/http-dialog.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from 'app/app-common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule,
  ],
  declarations: [
    HttpDialogComponent,
  ],
  exports: [
    HttpDialogComponent,
  ]

})
export class ScheduleDialogModule { }
