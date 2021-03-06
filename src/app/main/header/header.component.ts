import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Async, CUI, Delay } from '@cui/core';
import {
  AuthUserNode,
  LangNode,
  MainHeaderHeightNode,
  MainMenuWidthNode
} from 'ts/data/node/common';
import { BasicComponent } from 'app/basic-component';
import { BasicService } from 'ts/service/core/basic-service';
import { Global } from 'ts/globle';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends BasicComponent implements AfterViewInit {

  private headerElement: HTMLElement;
  private headerSpaceElement: HTMLElement;
  private focusElement: HTMLInputElement;

  public lang = LangNode.get();

  @ViewChild('header')
  public headerRef: ElementRef;
  @ViewChild('headerSpace')
  public headerSpaceRef: ElementRef;
  @ViewChild(MenuComponent)
  public menu: MenuComponent;

  constructor(private cdf: ChangeDetectorRef, private router: Router) {
    super();
    // 路由切換
    router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.cdf.markForCheck();
      }
    });

    this.listenNode(AuthUserNode, () => {
      let user = AuthUserNode.get();
      if (user) {
        let routes = user.routes;
        Global.routeName = {};
        for (let i in routes) {
          Global.routeName[routes[i].path] = routes[i].name;
        }
        Global.currentRouteName = Global.routeName[Global.currentRoute] || Global.currentRoute;
        this.cdf.markForCheck();
      }
    }, true);
  }

  ngAfterViewInit() {
    this.headerElement = this.headerRef.nativeElement;
    this.headerSpaceElement = this.headerSpaceRef.nativeElement;

    CUI.addElementContentChangeEvent(this.headerElement, this.delayResize.bind(this));
    this.listenNode(MainMenuWidthNode, () => {
      this.paddingLeftChange();
    }, true);

    this.resize();
    window.addEventListener('resize', this.delayResize.bind(this));
    window.addEventListener('resize', this.paddingLeftChange.bind(this));
    document.body.addEventListener('keyup', this.focus.bind(this));
    document.body.addEventListener('click', this.focus.bind(this));
  }

  public langChange() {
    LangNode.set(this.lang);
  }

  @Async()
  private paddingLeftChange() {
    let left = MainMenuWidthNode.get();
    if (window.innerWidth < 996 && left > 0) {
      this.headerElement.style.paddingLeft = '0px';
    } else {
      this.headerElement.style.paddingLeft = left + 'px';
    }
    this.cdf.markForCheck();
  }

  @Delay(300)
  private delayResize() {
    this.resize();
  }

  /**
   * 刷新header占用空間的高度
   */
  private resize() {
    let h1 = this.headerSpaceElement.offsetHeight;
    let h2 = this.headerElement.offsetHeight;
    if (this.headerElement
      && h1 != h2) {
      this.headerSpaceElement.style.height = h2 + 'px';
      MainHeaderHeightNode.set(h2);
    }
  }

  /**
   * input or textarea focused 隱藏header
   */
  private focus(e: Event) {
    if (this.focusElement) {
      this.focusElement.removeEventListener('blur', this.show);
    }
    let element = document.activeElement as HTMLInputElement;
    if ((element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') && !element.readOnly && !element.disabled) {
      this.focusElement = element;
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * 開啟選單
   */
  public openMenu() {
    this.menu.openOrClose();
  }

  public refresh() {
    if (window.confirm('確定更新登入資訊?')) {
      BasicService.refresh((result) => {
        if (result.success) {
          alert('更新成功');
        } else {
          alert(result.message);
        }
      });
    }
  }

  public show = () => {
    if (this.focusElement) {
      this.focusElement.removeEventListener('blur', this.show);
      this.focusElement = undefined;
    }
    CUI.style(this.headerElement, 'transform', 'translateY(0)');
  }

  public hide() {
    if (this.focusElement) {
      this.focusElement.addEventListener('blur', this.show);
    }
    CUI.style(this.headerElement, 'transform', 'translateY(-100%)');
  }
}
