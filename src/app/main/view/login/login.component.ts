import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { BasicComponent } from 'app/basic-component';
import { BasicService } from 'ts/service/core/basic-service';
import { CUI, AjaxUtil } from '@cui/core';
import { Global } from 'ts/globle';
import { LangNode } from 'ts/data/node/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BasicComponent implements AfterViewInit {
  public lang = LangNode.get();

  @ViewChild('loginWindow') loginWindowRef: ElementRef;
  private loginWindow: HTMLElement;
  public errorMessage = '';
  public form = {
    account: Global.env.account,
    password: Global.env.password
  };
  constructor(private cdf: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.loginWindow = this.loginWindowRef.nativeElement;
    this.resizeHandler();
    setTimeout(() => {
      this.loginWindow.classList.add('show');
    }, 0);
    CUI.addElementContentChangeEvent(this.loginWindow, this.resizeHandler);
    CUI.addListenOnEnter(this.loginWindow, this.login);
  }

  /**
   * 更新置中位置
   */
  private resizeHandler = () => {
    CUI.setTranslateCenter(this.loginWindow);
  }

  /**
   * 登錄
   */
  public login = () => {
    Global.loader.open('登錄中');
    BasicService.login(this.form, (result) => {
      Global.loader.close();
      if (!result.success) {
        this.errorMessage = AjaxUtil.getMessage(result);
      }
      this.cdf.markForCheck();
    });
  }
  public langChange() {
    LangNode.set(this.lang);
  }
}
