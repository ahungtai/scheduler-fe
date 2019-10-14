import { AppRoute } from '../ng/router/app';
import { ApiPath } from './api';
import { Apis } from 'ts/data/entity/auth-user';

export interface IRouteUseApi {
    [route: string]: Apis;
}

export let RouteUseApi: IRouteUseApi = {};

/**
 * 首頁
 */
RouteUseApi[AppRoute.Main.Index.join('/')] = {
    get: [ApiPath.GetSelf, ApiPath.GetUserCombobox],
    post: [],
    put: [ApiPath.PutSelf, ApiPath.PutSelfPassword, ApiPath.PutSelfPasswordReset],
    delete: []
};

/**
 * 角色
 */
RouteUseApi[AppRoute.Main.Manage.Role.join('/')] = {
    get: [ApiPath.GetRolePage, ApiPath.GetRolePermission],
    post: [ApiPath.PostRole],
    put: [ApiPath.PutRole, ApiPath.PutRolePermission],
    delete: []
};

/**
 * 使用者管理
 */
RouteUseApi[AppRoute.Main.Manage.User.join('/')] = {
    get: [ApiPath.GetUserPage, ApiPath.GetRoleCombobox],
    post: [ApiPath.PostUser, ApiPath.PostEmailSend],
    put: [ApiPath.PutUser, ApiPath.PutUserDisable, ApiPath.PutUserEnable, ApiPath.PutUserLock, ApiPath.PutUserUnlock, ApiPath.PutUserPassword, ApiPath.PutUserPasswordReset],
    delete: []
};

/**
 * 選單管理
 */
RouteUseApi[AppRoute.Main.Manage.Route.join('/')] = {
    get: [ApiPath.GetRoute, ApiPath.GetRouteFolder],
    post: [ApiPath.PostRoute],
    put: [ApiPath.PutRoute],
    delete: [ApiPath.DeleteRoute]
};

/**
 * API管理
 */
RouteUseApi[AppRoute.Main.Manage.Api.join('/')] = {
    get: [ApiPath.GetApi],
    post: [ApiPath.PostApi],
    put: [ApiPath.PutApi],
    delete: [ApiPath.DeleteApi]
};

/**
 * 訪問紀錄
 */
RouteUseApi[AppRoute.Main.Manage.AccessLog.join('/')] = {
    get: [ApiPath.GetAccessLogPage],
    post: [],
    put: [],
    delete: [ApiPath.DeleteAccessLog]
};

/**
 * 訪問紀錄群組
 */
RouteUseApi[AppRoute.Main.Manage.AccessLogGroup.join('/')] = {
    get: [ApiPath.GetAccessLogGroupPage, ApiPath.GetAccessLogDetilPage],
    post: [],
    put: [],
    delete: [ApiPath.DeleteAccessLog]
};

/**
 * 系統例外紀錄
 */
RouteUseApi[AppRoute.Main.Manage.ExceptionLog.join('/')] = {
    get: [ApiPath.GetExceptionLogPage],
    post: [],
    put: [],
    delete: [ApiPath.DeleteExceptionLog]
};

/**
 * Http請求排程
 */
RouteUseApi[AppRoute.Main.Schedule.Http.join('/')] = {
    get: [ApiPath.GetSchedulePage, ApiPath.GetScheduleJobKind],
    post: [ApiPath.PostScheduleJob, ApiPath.PostScheduleJobExecute, ApiPath.PostSubscription],
    put: [ApiPath.PutScheduleJob, ApiPath.PutScheduleJobStart, ApiPath.PutScheduleJobStop],
    delete: [ApiPath.DeleteScheduleJob, ApiPath.DeleteSubscription, ApiPath.PostSubscription, ApiPath.DeleteSubscription]
};

/**
 * 排程狀態
 */
RouteUseApi[AppRoute.Main.Schedule.Status.join('/')] = {
    get: [ApiPath.GetScheduleJobStatus],
    post: [],
    put: [ApiPath.PutScheduleJobUnlock],
    delete: []
};

/**
 * 排程紀錄
 */
RouteUseApi[AppRoute.Main.Schedule.Log.join('/')] = {
    get: [ApiPath.GetScheduleLog],
    post: [],
    put: [],
    delete: [ApiPath.DeleteScheduleLog]
};
