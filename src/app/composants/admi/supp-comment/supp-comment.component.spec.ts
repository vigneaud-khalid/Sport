import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppCommentComponent } from './supp-comment.component';

describe('SuppCommentComponent', () => {
  let component: SuppCommentComponent;
  let fixture: ComponentFixture<SuppCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
