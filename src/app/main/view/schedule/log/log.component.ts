import {
  AjaxUtil,
  Cache,
  CUI,
  Grid,
  StoreNodeSource
} from '@cui/core';
import { AppConfig } from 'ts/app-config';
import { BasicComponent } from 'app/basic-component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateUtil } from 'ts/util/date-util';
import { GridRenderUtil } from 'ts/util/grid-render-util';
import { JobKind, ScheduleLog } from 'ts/data/entity/entity';
import { JobKindsNode } from 'ts/data/node/schedule';
import { ScheduleLogService } from 'ts/service/schedule/schedule-log-service';

interface SearchForm {
  startTime: string;
  endTime: string;
  jobName: string;
  jobGroup: string;
  className: string;
  status: string;
}

function defaultForm(): SearchForm {
  return {
    startTime: DateUtil.now(AppConfig.TodayStartYYYYMMDDHHmmss) as string,
    endTime: DateUtil.now(AppConfig.TodayEndYYYYMMDDHHmmss) as string,
    jobName: '',
    jobGroup: '',
    className: '',
    status: '',
  };
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent extends BasicComponent {
  public grid: Grid.PageGrid<ScheduleLog>;

  @Cache.session('ScheduleLog', defaultForm())
  public searchForm: SearchForm;

  @StoreNodeSource(JobKindsNode, [])
  public jobKinds: JobKind[];

  public statuss = [
    { value: '0', name: '失敗' },
    { value: '1', name: '成功' }
  ];

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
   * 查詢
   */
  public reload() {
    this.grid.reload();
  }

  /**
   * 清除查詢條件
   */
  public clean() {
    this.searchForm = defaultForm();
  }

  /**
   * 刪除
   */
  public remove() {
    if (!window.confirm('您確定要刪除紀錄?')) {
      return;
    }
    let param = CUI.deepClone(this.searchForm);
    param.startTime = DateUtil.time(param.startTime);
    param.endTime = DateUtil.time(param.endTime) + 999;
    ScheduleLogService.remove(param, (result) => {
      if (result.success) {
        this.grid.load();
      } else {
        alert(AjaxUtil.getMessage(result));
      }
    });
  }

  /**
   * 產生grid
   */
  private buildGrid() {
    return Grid.PageGridBuilder.build({
      size: 100,
      rowColumns: [
        {
          value: 'time', name: '時間', align: 'left', width: '1%', canSort: true, sort: Grid.Sort.Desc
          , onRender: GridRenderUtil.date
        }
        , { value: 'jobName', name: '排程名稱', align: 'left', width: '1%', canSort: true }
        , { value: 'jobGroup', name: '排程群組', align: 'left', width: '1%', canSort: true }
        , {
          value: 'status', name: '狀態', align: 'left', width: '1%', canSort: true,
          onRender: (value) => {
            return value == 1 ? '成功' : '失敗';
          }
        }
        , { value: 'className', name: 'ClassName', align: 'center', width: '100%', canSort: true }
      ]
      , contentColumns: [
        {
          value: 'content', name: '內容', element: true
          , onRender: (value) => {
            let content = JSON.parse(value);
            return content ? this.buildLogGrid(content) : '';
          }
        }
      ]
      , onLoad: (pageable: Grid.IPageable, callback: Grid.ILoad<ScheduleLog>) => {
        let param = CUI.deepClone({}, pageable);
        CUI.deepClone(param, this.searchForm);
        param.startTime = DateUtil.time(param.startTime);
        param.endTime = DateUtil.time(param.endTime) + 999;
        ScheduleLogService.page(param, (result) => {
          if (result.success) {
            callback(result.data);
          } else {
            alert(AjaxUtil.getMessage(result));
          }
        });
      }
    });
  }

  /**
   * 產生grid
   */
  private buildLogGrid(records) {
    let grid = Grid.GridBuilder.build({
      rowColumns: [
        {
          value: 'time', name: '時間', align: 'left', width: '1%', canSort: true, sort: Grid.Sort.Desc
          , onRender: GridRenderUtil.date
        }
        , { value: 'key', name: 'key', align: 'left', width: '1%', canSort: true }
        , { value: 'value', name: 'value', align: 'left', width: '100%', canSort: true }
      ]
      , contentColumns: [
        {
          value: 'value', name: 'value', element: true, onRender: GridRenderUtil.keyJson
        }
      ]
    });
    grid.load(records);
    return grid.getElement();
  }

}
