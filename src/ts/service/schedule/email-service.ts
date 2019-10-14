import { AjaxMethod, AjaxTryCatch } from '@cui/core';
import { ApiPath } from 'ts/constant/api';
import { Asserts } from 'ts/util/asserts';
import { Global } from 'ts/globle';

/**
 * 信件服務
 */
export class EmailService {

	/**
	 * 使用GET由伺服器代發請求
	 * @param {Object} formData
	 * @param {Function} callback
	 */
	@AjaxTryCatch(1)
	public static send(formData, callback) {
		Asserts.notEmpty(formData.addr, 'addr' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.subject, 'subject' + Asserts.NotEmptyMessage);
		Asserts.notEmpty(formData.message, 'message' + Asserts.NotEmptyMessage);
		Global.ajaxManager.request({
			url: ApiPath.PostEmailSend,
			method: AjaxMethod.POST,
			data: formData,
			callback: callback
		});
	}
}
