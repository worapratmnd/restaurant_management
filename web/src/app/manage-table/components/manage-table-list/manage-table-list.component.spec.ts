/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageTableListComponent } from './ManageTableListComponent';

describe('ManageTableListComponent', () => {
  let component: ManageTableListComponent;
  let fixture: ComponentFixture<ManageTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTableListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
