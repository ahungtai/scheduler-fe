import { AjaxMethod, AjaxTryCatch } from '@cui/core';
import { ApiPath } from '../../constant/api';
import { Asserts } from '../../util/asserts';
import { Global } from '../../globle';

/**
 * Session
 */
export class SessionService {

	/**
	 * 查詢
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static query(formData, callback) {
		Global.ajaxManager.request({
			url: ApiPath.GetSession,
			data: formData,
			callback: callback
		});
	}

	/**
	 * 刪除
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static remove(formData, callback) {
		Asserts.notEmpty(formData.id, 'id' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.DeleteSession,
			method: AjaxMethod.DELETE,
			data: formData,
			callback: callback
		});
	}
}
