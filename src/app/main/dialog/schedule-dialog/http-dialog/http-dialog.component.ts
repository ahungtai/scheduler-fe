import {
  AjaxUtil,
  CUI,
  IAjaxManagerResult,
  StoreNodeSource
} from '@cui/core';
import { BasicComponent } from 'app/basic-component';
import { BasicState } from 'ts/constant/basic-state';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { DialogComponent } from 'app/app-common/component/dialog/dialog.component';
import { DiscoveryService } from 'ts/service/core/discovery-service';
import { DomUtil } from 'ts/util/dom-util';
import { HttpRequestBO } from 'ts/data/bo';
import { JobBO, ScheduleJobService, ScheduleJobVO } from 'ts/service/schedule/schedule-job-service';
import { JobKind } from 'ts/data/entity/entity';
import { JobKindsNode } from 'ts/data/node/schedule';
import { JsonUtil } from 'ts/util/json-util';
import { ProxyService } from 'ts/service/core/proxy-service';


@Component({
  selector: 'app-http-dialog',
  templateUrl: './http-dialog.component.html',
  styleUrls: ['./http-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpDialogComponent extends BasicComponent {
  public state = BasicState.None;
  public title: string;
  public form: JobBO;
  public index: number;
  public message = '';

  public feignClient = 'feign';

  public jobKind: JobKind;

  @StoreNodeSource(JobKindsNode, [])
  public jobKinds: JobKind[];

  public services: string[];

  @ViewChild(DialogComponent)
  public dialog: DialogComponent;
  @Input()
  public onComplete: Function;
  @Input()
  public onCancel: Function;

  private pasteHandler;

  constructor(private cdf: ChangeDetectorRef) {
    super();
    this.initForm();
    // 取得服務列表
    DiscoveryService.service((result) => {
      this.services = result.data;
      this.cdf.markForCheck();
    });
  }

  public jobKindChange() {
    if (this.form.jobName) {
      for (let i in this.jobKinds) {
        if (this.form.jobName == this.jobKinds[i].jobName) {
          this.form.jobName = this.jobKind.jobName;
        }
      }
    } else {
      this.form.jobName = this.jobKind.jobName;
    }
    this.form.jobGroup = this.jobKind.jobGroup;
    this.form.cron = this.jobKind.cron;
    this.form.className = this.jobKind.className;
    this.form.description = this.jobKind.description;
    this.form.jobData.httpServiceId = '';
    this.form.jobData.authServiceId = '';
  }

  private initForm() {
    this.form = {
      jobName: ''
      , jobGroup: ''
      , cron: ''
      , className: ''
      , description: ''
      , jobData: {
        httpServiceId: ''
        , authServiceId: ''
        , fail: {
          retry: 0,
          interval: 5000
        }
        , http: {
          url: ''
          , method: 'get'
          , headers: ''
          , params: ''
          , body: ''
          , connectionTimeout: 30000
          , readTimeout: 30000
        }
        , authType: 0
        , authSpel: ''
        , auth: {
          url: ''
          , method: 'get'
          , headers: ''
          , params: ''
          , body: ''
          , connectionTimeout: 30000
          , readTimeout: 30000
        }
      }
    };
    if (this.jobKinds.length > 0) {
      this.jobKind = this.jobKinds[0];
      this.jobKindChange();
    }
  }

  public test(id: string, request: HttpRequestBO) {
    if (id) {
      DiscoveryService.instance(id, (result) => {
        if (result.success) {
          let instances = result.data;
          if (instances.length > 0) {
            request = CUI.deepClone(request);
            request.url = instances[0].uri + request.url;
            ProxyService.post(request, this.testCallback);
          } else {
            alert(id + ' 目前沒有服務');
          }
        } else {
          alert(result.message);
        }
      });
    } else {
      ProxyService.post(request, this.testCallback);
    }
  }

  private testCallback = (result) => {
    this.cdf.markForCheck();
    try {
      this.message = CUI.printJson(result);
    } catch (e) {
      this.message = result;
    }
  }

  /**
   * 開啟
   * @param state
   * @param form
   * @param index
   */
  public open(state: BasicState, job?: ScheduleJobVO, index?: number) {
    this.message = '';
    this.state = state;
    this.index = index || 0;
    if (this.state == BasicState.Insert) {
      this.title = '新增';
      if (job) {
        this.form = CUI.deepClone(job);
        if (this.form.jobName) {
          this.form.jobName = this.form.jobName.replace(/#\d+$/, '');
        }
      } else {
        this.initForm();
      }
    } else if (this.state == BasicState.Update) {
      this.title = '修改';
      this.form = CUI.deepClone(job);
    }
    this.initJobKind();
    this.dialog.open();
    this.pasteHandler = DomUtil.addPasteListener(this.pasteCallback);
  }

  /**
   * 將剪貼簿的內容解析
   */
  private pasteCallback = (text) => {
    try {
      this.form = JSON.parse(text);
      if (this.form.jobName) {
        this.form.jobName = this.form.jobName.replace(/#\d+$/, '');
      }
      this.initJobKind();
      this.cdf.detectChanges();
    } catch (e) {
      console.log(e);
      alert('商戶資料格式錯誤');
    }
  }

  private initJobKind() {
    for (let i in this.jobKinds) {
      if (this.jobKinds[i].jobGroup == this.form.jobGroup) {
        this.jobKind = this.jobKinds[i];
      }
    }
  }

  /**
   * 取消
   */
  public close() {
    this.dialog.close();
    this.cancel();
  }

  /**
   * 提交
   */
  public save = () => {
    if (this.state == BasicState.Insert) {
      ScheduleJobService.add(this.form, this.callback);
    } else if (this.state == BasicState.Update) {
      ScheduleJobService.modify(this.form, this.callback);
    }
  }

  /**
   * 取消
   */
  public cancel = () => {
    DomUtil.removePasteListener(this.pasteHandler);
    this.state = BasicState.None;
    CUI.callFunction(this.onCancel);
  }

  /**
  * 新增返回
  */
  public callback = (result: IAjaxManagerResult) => {
    if (!result.success) {
      alert(AjaxUtil.getMessage(result));
      return;
    }
    this.dialog.close();
    CUI.callFunction(this.onComplete);
  }

  public httpBodyBlur() {
    this.form.jobData.http.body = JsonUtil.cleanFormat(this.form.jobData.http.body);
  }

  public authBodyBlur() {
    this.form.jobData.auth.body = JsonUtil.cleanFormat(this.form.jobData.auth.body);
  }

  /**
   * 將資料複製到剪貼簿
   */
  public copy() {
    DomUtil.copyText(JSON.stringify(this.form));
  }
}