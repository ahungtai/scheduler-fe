import { AjaxUtil, CUI, Grid } from '@cui/core';
import { BasicComponent } from 'app/basic-component';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DomUtil } from 'ts/util/dom-util';
import { GridRenderUtil } from 'ts/util/grid-render-util';
import { HttpDialogComponent } from 'app/main/dialog/schedule-dialog/http-dialog/http-dialog.component';
import { JobBO, ScheduleJobService, ScheduleJobVO } from 'ts/service/schedule/schedule-job-service';
import { JobStatus } from 'ts/constant/schedule';
import { ScheduleService } from 'ts/service/schedule/schedule-service';
import { SubscriptionService } from 'ts/service/plus/subscription-service';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpComponent extends BasicComponent {
  public grid: Grid.PageGrid<ScheduleJobVO>;

  public name = '';

  @ViewChild(HttpDialogComponent)
  public dialog: HttpDialogComponent;

  constructor() {
    super();
    this.grid = this.buildGrid();
    this.search();
  }

  /**
   * 查詢
   */
  public search() {
    this.grid.reload();
  }

  /**
   * 清除查詢條件
   */
  public clean() {
    this.name = '';
  }

  /**
   * 查詢條件改變
   */
  public searchChange() {
    this.grid.load();
  }

  /**
    * 新增
    */
  public add() {
    this.dialog.open(this.BasicState.Insert);
  }

  /**
   * 修改
   */
  public modify(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    this.dialog.open(this.BasicState.Update, CUI.deepClone(record), index);
  }

  /**
   * 執行
   */
  public execute(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    let data: JobBO = {
      jobName: record.jobName,
      jobGroup: record.jobGroup,
      className: record.className,
      description: record.description,
      cron: record.cron,
      jobData: record.jobData
    };
    ScheduleJobService.execute(data, (result) => {
      if (result.success) {
        this.grid.reload();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }

  /**
   * 複製
   */
  public copy(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    let data: ScheduleJobVO = CUI.deepClone(record);
    data.jobName = data.jobName.replace(/#.+$/, '');
    this.dialog.open(this.BasicState.Insert, data, index);
  }

  /**
   * 複製
   */
  public remove(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    if (window.confirm('確定要刪除?')) {
      ScheduleJobService.remove({
        jobName: record.jobName,
        jobGroup: record.jobGroup
      }, (result) => {
        if (result.success) {
          SubscriptionService.remove({ tag: this.getTag(record), status: '0' });
          this.grid.reload();
        } else {
          alert(AjaxUtil.getMessage(result));
        }
      });
    }
  }

  /**
   * 開始
   * @param record
   * @param index
   * @param e
   */
  public start(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    ScheduleJobService.start({
      jobName: record.jobName,
      jobGroup: record.jobGroup
    }, (result) => {
      if (result.success) {
        this.grid.reload();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }

  /**
   * 停止
   * @param record
   * @param index
   * @param e
   */
  public stop(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    ScheduleJobService.stop({
      jobName: record.jobName,
      jobGroup: record.jobGroup
    }, (result) => {
      if (result.success) {
        this.grid.reload();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }


  /**
   * 訂閱
   * @param record
   * @param index
   * @param e
   */
  public subscription(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    SubscriptionService.add({
      tag: this.getTag(record),
      status: '0'
    }, (result) => {
      if (result.success) {
        this.grid.reload();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }

  /**
   * 取消訂閱
   * @param record
   * @param index
   * @param e
   */
  public unsubscription(record: ScheduleJobVO, index, e: Event) {
    e.stopPropagation();
    SubscriptionService.remove({
      tag: this.getTag(record),
      status: '0'
    }, (result) => {
      if (result.success) {
        this.grid.reload();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }

  /**
   * 完成
   */
  public onComplete = () => {
    this.grid.reload();
  }

  private getTag(record: ScheduleJobVO) {
    return record.jobGroup + '#' + record.jobName;
  }

  /**
   * 產生grid
   */
  private buildGrid() {
    return Grid.PageGridBuilder.build({
      size: 20,
      rowColumns: [
        {
          value: 'state', name: '操作', align: 'left', width: '1%', element: true, tdTranslate: true
          , onRender: (value, record, index) => {
            if (record.jobName.indexOf('#execute') != -1) return '立即執行任務';
            let buttons = [
              DomUtil.buildButton({
                text: '執行',
                className: 'small ' + this.ApiClassName.PostScheduleJobExecute,
                onclick: this.execute.bind(this, record, index)
              }),
              DomUtil.buildButton({
                text: '修改',
                className: 'small ' + this.ApiClassName.PutScheduleJob,
                onclick: this.modify.bind(this, record, index)
              }),
              DomUtil.buildButton({
                text: '複製',
                className: 'small bg-dark ' + this.ApiClassName.PostScheduleJob,
                onclick: this.copy.bind(this, record, index)
              }),
              DomUtil.buildButton({
                text: '刪除',
                className: 'small bg-accent ' + this.ApiClassName.DeleteScheduleJob,
                onclick: this.remove.bind(this, record, index)
              })
            ];
            if (value == 'PAUSED') {
              buttons.push(DomUtil.buildButton({
                text: '開始',
                className: 'small ' + this.ApiClassName.PutScheduleJobStart,
                onclick: this.start.bind(this, record, index)
              }));
            } else {
              buttons.push(DomUtil.buildButton({
                text: '停止',
                className: 'small bg-accent ' + this.ApiClassName.PutScheduleJobStop,
                onclick: this.stop.bind(this, record, index)
              }));
            }
            if (SubscriptionService.find(this.getTag(record), '0')) {
              buttons.push(DomUtil.buildButton({
                text: '取消訂閱',
                className: 'small bg-accent ' + this.ApiClassName.DeleteSubscription,
                onclick: this.unsubscription.bind(this, record, index)
              }));
            } else {
              buttons.push(DomUtil.buildButton({
                text: '訂閱',
                className: 'small ' + this.ApiClassName.PostSubscription,
                onclick: this.subscription.bind(this, record, index)
              }));
            }
            return buttons;
          }
        }
        , {
          value: 'state', name: '狀態', align: 'left', width: '1%', tdTranslate: true
          , onRender: (value, record, index) => {
            return JobStatus[value] || value;
          }
        }
        , { value: 'jobName', name: '名稱', align: 'left', canSort: true, width: '1%' }
        , { value: 'jobGroup', name: '群組', align: 'center', canSort: true, width: '1%' }
        , { value: 'cron', name: 'CRON', align: 'center', width: '1%' }
        , { value: 'prevFireTime', name: '上次執行時間', align: 'center', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'nextFireTime', name: '下次執行時間', align: 'center', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'description', name: '备注', align: 'center', width: '100%' }
      ]
      , contentColumns: [
        { value: 'startTime', name: '開始時間', align: 'center', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'endTime', name: '結束時間', align: 'center', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'jobData.fail', name: 'Failure', align: 'center', width: '1%', onRender: GridRenderUtil.json, element: true, thTranslate: false }
        , { value: 'jobData.http', name: 'Http Request', align: 'center', width: '1%', onRender: GridRenderUtil.json, element: true, thTranslate: false }
        , { value: 'jobData.authType', name: 'Failure', align: 'center', width: '1%', thTranslate: false }
        , { value: 'jobData.authSpel', name: 'Failure', align: 'center', width: '1%', thTranslate: false }
        , { value: 'jobData.auth', name: 'Failure', align: 'center', width: '1%', onRender: GridRenderUtil.json, element: true, thTranslate: false }
      ]
      , onLoad: (pageable: Grid.IPageable, callback: Grid.ILoad<ScheduleJobVO>) => {
        let data = CUI.deepClone({}, pageable);
        data.name = this.name;
        ScheduleService.page(data, (result) => {
          if (result.success) {
            callback(result.data);
          } else {
            alert(AjaxUtil.getMessage(result));
          }
        });
      }
    });
  }
}
