import { AjaxMethod, AjaxTryCatch, AjaxUtil } from '@cui/core';
import { ApiPath } from 'ts/constant/api';
import { Asserts } from 'ts/util/asserts';
import { Global } from 'ts/globle';
import { HttpRequestBO } from 'ts/data/bo';


export interface FailRetry {
	retry: number,
	interval: number,
}

export interface HttpJobData {
	httpServiceId: string;
	authServiceId: string;
	fail: FailRetry;
	http: HttpRequestBO;
	authType: number;
	auth: HttpRequestBO;
	authSpel: string;
}

export interface JobKey {
	jobName: string;
	jobGroup: string;
}

export interface JobBO extends JobKey {
	cron: string;
	className: string;
	description: string;
	jobData: HttpJobData;
}

export interface ScheduleJobVO {
	jobName: string;
	jobGroup: string;
	description: string;
	cron: string;
	state: string;
	startTime: number;
	endTime: number;
	prevFireTime: number;
	nextFireTime: number;
	className: string;
	jobData: any;
}


/**
 * 排程服務
 */
export class ScheduleJobService {
	/**
	 * 查詢
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static page(formData, callback) {
		Global.ajaxManager.request({
			url: ApiPath.GetSchedulePage,
			data: formData,
			callback: callback
		});
	}

	/**
	 * 增加排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(0)
	public static kind(callback) {
		Global.ajaxManager.request({
			url: ApiPath.GetScheduleJobKind,
			callback: callback
		});
	}

	/**
	 * 增加排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static execute(formData: JobBO, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.PostScheduleJobExecute,
			method: AjaxMethod.POST,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}

	/**
	 * 增加排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static add(formData: JobBO, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.cron, 'cron' + Asserts.NotEmptyMessage);
		Asserts.notNull(formData.jobData, 'jobData' + Asserts.NotNullMessage);
		Asserts.notNull(formData.jobData.http, 'http' + Asserts.NotNullMessage);
		Asserts.notEmpty(formData.jobData.http.url, 'http url' + Asserts.NotEmptyMessage);
		if (formData.jobData.authType != 0) {
			Asserts.notNull(formData.jobData.auth, 'auth' + Asserts.NotNullMessage);
			Asserts.notEmpty(formData.jobData.auth.url, 'auth url' + Asserts.NotEmptyMessage);
			Asserts.notEmpty(formData.jobData.authSpel, 'authSpel' + Asserts.NotEmptyMessage);
		}
		Global.ajaxManager.request({
			url: ApiPath.PostScheduleJob,
			method: AjaxMethod.POST,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}

	/**
	 * 增加排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static modify(formData: JobBO, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.cron, 'cron' + Asserts.NotEmptyMessage);
		Asserts.notNull(formData.jobData, 'jobData' + Asserts.NotNullMessage);
		Asserts.notNull(formData.jobData.http, 'http' + Asserts.NotNullMessage);
		Asserts.notEmpty(formData.jobData.http.url, 'http url' + Asserts.NotEmptyMessage);
		if (formData.jobData.authType != 0) {
			Asserts.notNull(formData.jobData.auth, 'auth' + Asserts.NotNullMessage);
			Asserts.notEmpty(formData.jobData.auth.url, 'auth url' + Asserts.NotEmptyMessage);
			Asserts.notEmpty(formData.jobData.authSpel, 'authSpel' + Asserts.NotEmptyMessage);
		}
		Global.ajaxManager.request({
			url: ApiPath.PutScheduleJob,
			method: AjaxMethod.PUT,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}

	/**
	 * 停止排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static stop(formData: JobKey, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.PutScheduleJobStop,
			method: AjaxMethod.PUT,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}

	/**
	 * 繼續排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static start(formData: JobKey, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.PutScheduleJobStart,
			method: AjaxMethod.PUT,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}


	/**
	 * 繼續排程
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static remove(formData: JobKey, callback) {
		Asserts.notEmpty(formData.jobName, 'jobName' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.jobGroup, 'jobGroup' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.DeleteScheduleJob,
			method: AjaxMethod.DELETE,
			headers: AjaxUtil.ContentTypeJson,
			data: JSON.stringify(formData),
			callback: callback
		});
	}

	/**
	 * 查詢任務狀態
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static status(callback) {
		Global.ajaxManager.request({
			url: ApiPath.GetScheduleJobStatus,
			callback: callback
		});
	}

	/**
	 * 解除任務鎖定
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static unlock(formData, callback) {
		Global.ajaxManager.request({
			url: ApiPath.PutScheduleJobUnlock,
			method: AjaxMethod.PUT,
			data: formData,
			callback: callback
		});
	}
}
