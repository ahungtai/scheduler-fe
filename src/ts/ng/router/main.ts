import { BootRoute } from './boot';
import { ManageRoute } from './manage';
import { ToolRoute } from './tool';
import { ScheduleRoute } from 'ts/ng/router/schedule';

export enum MainRouteName {
  Default = '',
  Index = 'index',
  Login = 'login',
  Tool = 'tool',
  Boot = 'boot',
  Manage = 'manage',
  Schedule = 'schedule',
}

export interface MainRoute {
  /**
   * 預設
   */
  Default: string[];
  /**
    * 登錄頁
    */
  Login: string[];
  /**
    * 首頁
    */
  Index: string[];
  Boot: BootRoute;
  Tool: ToolRoute;
  Manage: ManageRoute;
  Schedule: ScheduleRoute;
}
