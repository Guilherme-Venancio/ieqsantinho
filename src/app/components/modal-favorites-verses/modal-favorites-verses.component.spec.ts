import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFavoritesVersesComponent } from './modal-favorites-verses.component';

describe('ModalFavoritesVersesComponent', () => {
  let component: ModalFavoritesVersesComponent;
  let fixture: ComponentFixture<ModalFavoritesVersesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFavoritesVersesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFavoritesVersesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
