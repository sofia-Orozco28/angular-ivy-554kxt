import { DebugElement } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let el: DebugElement;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  const hero = {
    id: 1,
    name: 'NewHero',
    strength: 80,
  };

  beforeEach(
    waitForAsync(() => {
      mockHeroService = jasmine.createSpyObj('HeroService', ['addHero']);
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [{ provide: HeroService, useValue: mockHeroService }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  describe('should call HeroService.addHero()', () => {
    it('by using input dialog and push add button', () => {
      const input = el.query(By.css('input')).nativeElement;
      input.value = 'NewHero';
      const button = el.query(By.css('button'));
      button.triggerEventHandler('click', null);
      fixture.detectChanges;
      expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: 'NewHero' });
    });

   

    it('by calling method add()', () => {
      //NOT WORKING
      // component.add('newHero');
      // expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: 'NewHero'} );
      //===================================================
      //WORKING
      mockHeroService.addHero.and.returnValue(of(hero));
      component.add('newHero');
      expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: 'newHero' });
    });
  });
});
