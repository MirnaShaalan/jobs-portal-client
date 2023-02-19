import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobsComponent } from './delete-job.component';

describe('DeleteJobsComponent', () => {
  let component: DeleteJobsComponent;
  let fixture: ComponentFixture<DeleteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteJobsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
