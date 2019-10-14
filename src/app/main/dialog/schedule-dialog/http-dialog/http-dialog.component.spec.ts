import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpDialogComponent } from './http-dialog.component';

describe('HttpDialogComponent', () => {
  let component: HttpDialogComponent;
  let fixture: ComponentFixture<HttpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
