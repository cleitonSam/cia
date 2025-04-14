import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPartnersComponent } from './payment-partners.component';

describe('PaymentPartnersComponent', () => {
  let component: PaymentPartnersComponent;
  let fixture: ComponentFixture<PaymentPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPartnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
