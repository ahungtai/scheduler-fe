import { ScheduleDialogModule } from './schedule-dialog.module';

describe('ScheduleDialogModule', () => {
  let scheduleDialogModule: ScheduleDialogModule;

  beforeEach(() => {
    scheduleDialogModule = new ScheduleDialogModule();
  });

  it('should create an instance', () => {
    expect(scheduleDialogModule).toBeTruthy();
  });
});
