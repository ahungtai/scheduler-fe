import { AjaxUtil, Grid } from '@cui/core';
import { BasicComponent } from 'app/basic-component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomUtil } from 'ts/util/dom-util';
import { GridRenderUtil } from 'ts/util/grid-render-util';
import { ScheduleJobService } from 'ts/service/schedule/schedule-job-service';
import { SubscriptionService } from 'ts/service/plus/subscription-service';

interface JobStatus {
  id: string;
  running: boolean;
  startTime: number;
  endTime: number;
  lockCount: number;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent extends BasicComponent {
  public grid: Grid.Grid<JobStatus>;

  constructor() {
    super();
    this.grid = this.buildGrid();
    this.search();
  }

  /**
   * 查詢
   */
  public search() {
    this.grid.load();
  }

  /**
   * 解除鎖定
   */
  public unlock(record: JobStatus, index, e: Event) {
    ScheduleJobService.unlock({ id: record.id }, (result) => {
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
  public subscription(record: JobStatus, index, e: Event) {
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
  public unsubscription(record: JobStatus, index, e: Event) {
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

  private getTag(record: JobStatus) {
    return 'JobStatus:' + record.id;
  }

  /**
   * 產生grid
   */
  private buildGrid() {
    return Grid.GridBuilder.build({
      size: 100,
      height: '500px',
      rowColumns: [
        {
          value: 'running', name: '操作', align: 'left', width: '1%', element: true, tdTranslate: true
          , onRender: (value, record: JobStatus, index) => {
            let buttons = [];
            if (value) {
              buttons.push(DomUtil.buildButton({
                text: '解除',
                className: 'bg-dark small ' + this.ApiClassName.PutScheduleJobUnlock,
                onclick: this.unlock.bind(this, record, index)
              }));
              if (SubscriptionService.find(this.getTag(record), '0')) {
                buttons.push(DomUtil.buildButton({
                  text: '取消訂閱',
                  className: 'small bg-accent ' + this.ApiClassName.DeleteSubscription,
                  onclick: this.unsubscription.bind(this, record, index)
                }));
              }
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

        , { value: 'id', name: '名稱', align: 'left', width: '1%' }
        , { value: 'running', name: 'Running', align: 'center', width: '1%' }
        , { value: 'lockCount', name: 'Lock Count', align: 'center', width: '1%' }
        , { value: 'startTime', name: '上次執行時間', align: 'center', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'endTime', name: '上次完成時間', align: 'center', width: '100%', onRender: GridRenderUtil.date }
      ],
      onLoad: (pageable: Grid.IPageable, callback: Grid.ILoad<JobStatus>) => {
        ScheduleJobService.status((result) => {
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
