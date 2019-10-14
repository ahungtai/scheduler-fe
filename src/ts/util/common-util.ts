import { CUI } from '@cui/core';

export class CommonUtil {
    /**
     * 清除前後換行空白
     * @param obj
     */
    public static trimStrValue(obj: any) {
        if (!obj) { return obj; }
        if (CUI.isObject(obj)) {
            let value;
            for (let id in obj) {
                value = obj[id];
                if (value && typeof value === 'string') {
                    obj[id] = value.trim();
                }
            }
            return obj;
        } else if (typeof obj === 'string') {
            return obj.trim();
        }
    }
}
