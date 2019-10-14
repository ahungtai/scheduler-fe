import { AjaxMethod, AjaxTryCatch, AjaxUtil } from '@cui/core';
import { ApiPath } from 'ts/constant/api';
import { Asserts } from 'ts/util/asserts';
import { Global } from 'ts/globle';

/**
 * 排程服務
 */
export class ScheduleLogService {
	/**
	 * 查詢
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static page(formData, callback) {
		Global.ajaxManager.request({
			url: ApiPath.GetScheduleLog,
			data: formData,
			callback: callback
		});
	}


	/**
	 * 查詢
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static remove(formData, callback) {
		Global.ajaxManager.request({
			url: ApiPath.DeleteScheduleLog,
			method: AjaxMethod.DELETE,
			data: formData,
			callback: callback
		});
	}
}
