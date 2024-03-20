import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  let panelEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    panelEl = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('panel should have class mui-panel', () => {
    expect(panelEl).toHaveClass('mui-panel');
  });
});
