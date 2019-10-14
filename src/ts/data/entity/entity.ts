/**系統訪問紀錄*/
export interface AccessLog {
    /**自動編號*/
    id: number;
    /**建立時間*/
    time: number;
    /**服務名稱*/
    service: string;
    /**Session ID*/
    sessionId: string;
    /**訪問網址*/
    url: string;
    /**訪問方法*/
    method: string;
    /**來源IP*/
    ip: string;
    /**來源位置*/
    location: string;
    /**請求表頭*/
    requestHeader: string;
    /**請求參數*/
    requestParameter: string;
    /**請求Body*/
    requestBody: string;
    /**回覆表頭*/
    responseHeader: string;
    /**回覆內容*/
    responseContent: string;
    /**使用者*/
    user: string;
    /**備註*/
    remar: string;
    /**Http Status Code*/
    status: number;
    /**處理時間*/
    ms: number;
}

export interface ExceptionLog {
    /**自動編號*/
    id: number;
    /**建立時間*/
    time: number;
    /**服務名稱*/
    service: string;
    /**訊息*/
    message: string;
    /**內容*/
    content: string;
}

/**訪問端口*/
export interface Api {
    /**端口路徑*/
    id: number;
    /**請求方法(GET、POST、PUT、DELETE)*/
    method: string;
    /**端口路徑*/
    path: string;
    /**備註*/
    remark: string;
    /**啟用*/
    enabled: boolean;
    /**預設可訪問*/
    required: boolean;
    /**修改人*/
    updateUser?: number;
    /**修改時間*/
    updateTime?: number;
    /**建立人*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
}

/**使用者*/
export interface User {
    /**帳號*/
    account: string;
    /**密碼*/
    password: string;
    /**名稱*/
    name: string;
    /**電子信箱*/
    email: string;
    /**平台ID*/
    platformId: string;
    /**角色ID*/
    roleId: string;
    /**登錄錯誤次數*/
    loginFailCount: number;
    /**是否凍結*/
    locked: boolean;
    /**是否啟用*/
    enabled: boolean;
    /**修改人*/
    updateUser?: number;
    /**修改時間*/
    updateTime?: number;
    /**建立人*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
    /**PK*/
    id?: number;
}

/**路由*/
export interface Route {
    /**ID*/
    id?: number;
    /**上層ID*/
    parentId: number;
    /**名稱*/
    name: string;
    /**類型*/
    type: number;
    /**路徑*/
    path: string;
    /**描述*/
    remark: string;
    /**css class name*/
    className: string;
    /**順序*/
    sort: number;
    /**啟用*/
    enabled: boolean;
    /**預設顯示*/
    required: boolean;
    /**修改人*/
    updateUser?: number;
    /**修改時間*/
    updateTime?: number;
    /**建立人*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
}

/**角色*/
export interface Role {
    /**自動編號*/
    id: number;
    /**名稱*/
    name: string;
    /**角色等級*/
    level: number;
    /**啟用*/
    enabled: boolean;
    /**修改人*/
    updateUser?: number;
    /**修改時間*/
    updateTime?: number;
    /**建立者*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
}


/**角色可訪問API*/
export interface RoleApi {
    /**群組ID*/
    id: number;
    /**API ID*/
    apiId: string;
    /**建立人*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
}

/**角色可訪問頁面*/
export interface RoleRoute {
    /**群組ID*/
    id: number;
    /**路由ID*/
    routeId: string;
    /**建立人*/
    createUser?: number;
    /**建立時間*/
    createTime?: number;
}


export interface Subscription {
    /**訂閱類型*/
    tag: string;
    /**訂閱類型狀態*/
    status: string;
    /**訂閱使用者*/
    user_id: string;
}

export interface ScheduleLog {
    id: number;
    /**排程名稱*/
    jobName: string;
    /**排程類型*/
    jobGroup: string;
    /**Class Name*/
    className: string;
    /**內容*/
    content: string;
    /**狀態*/
    status: number;
    /**建立時間*/
    time: number;
}

export interface JobKind {
    jobName: string;
    jobGroup: string;
    cron: string;
    description: string;
    className: string;
}

export interface QrtzTrigger {
    schedName: string;
    triggerName: string;
    triggerGroup: string;
    calendarName: string;
    description: string;
    endTime: number;
    jobData: number;
    jobGroup: string;
    jobName: string;
    misfireInstr: number;
    nextFireTime: number;
    prevFireTime: number;
    priority: number;
    startTime: number;
    triggerState: string;
    triggerType: string;
    cron: QrtzCronTrigger;
}


export interface QrtzCronTrigger {
    schedName: string;
    triggerName: string;
    triggerGroup: string;
    cronExpression: string;
    timeZoneId: string;
}
