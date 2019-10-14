import { AjaxUtil } from '@cui/core';
import { BasicComponent } from '../../../../basic-component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { Grid } from '@cui/core';
import { DomUtil } from 'ts/util/dom-util';
import { GridRenderUtil } from 'ts/util/grid-render-util';
import { WebSession } from 'ts/data/entity/auth-user';
import { SessionService } from 'ts/service/core/session-service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionComponent extends BasicComponent {

  public grid: Grid.Grid<WebSession>;

  constructor(private cdf: ChangeDetectorRef) {
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
   * 刪除
   */
  public remove(record: WebSession, index, e: Event) {
    e.stopPropagation();
    if (window.confirm('確定要刪除?')) {
      SessionService.remove({ id: record.id }, (result) => {
        if (result.success) {
          this.grid.reload();
        } else {
          alert(AjaxUtil.getMessage(result));
        }
      });
    }
  }

  /**
   * 完成
   */
  public onComplete = () => {
    this.grid.reload();
  }

  /**
   * 產生grid
   */
  private buildGrid() {
    return Grid.GridBuilder.build<WebSession>({
      size: 100,
      index: true,
      rowColumns: [
        {
          value: '', name: '操作', align: 'left', width: '1%', element: true, tdTranslate: true
          , onRender: (value, record, index) => {
            return DomUtil.buildButton({
              text: '刪除',
              className: 'bg-accent small ' + this.ApiClassName.DeleteSession,
              onclick: this.remove.bind(this, record, index)
            })
              ;
          }
        }
        , { value: 'id', name: 'Session ID', align: 'left', width: '1%', canSort: true, sort: Grid.Sort.Asc }
        , { value: 'name', name: '使用者', align: 'left', width: '1%', canSort: true, sort: Grid.Sort.Asc }
        , { value: 'createTime', name: '建立時間', align: 'left', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'lastAccessedTime', name: '最後訪問時間', align: 'left', width: '1%', onRender: GridRenderUtil.date }
        , { value: 'maxInactiveInterval', name: '最大存活時間', align: 'center', width: '100%' }
      ],
      onLoad: (pageable: Grid.IPageable, callback: Grid.ILoad) => {
        SessionService.query(pageable, (result) => {
          if (result.success) {
            this.cdf.markForCheck();
            callback(result.data);
          } else {
            alert(AjaxUtil.getMessage(result));
          }
        });
      }
    });
  }
}
