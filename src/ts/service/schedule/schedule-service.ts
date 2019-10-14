import { AjaxTryCatch } from '@cui/core';
import { ApiPath } from 'ts/constant/api';
import { Global } from 'ts/globle';

export interface ScheduleJobVO{
	jobName:string;
	jobGroup:string;
	description:string;
	cron:string;
	state:string;
	prevFireTime:string;
	nextFireTime:string;
	className:string;
	jobData:string;
}


/**
 * 排程服務
 */
export class ScheduleService {
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
}
