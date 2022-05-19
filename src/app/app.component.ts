import { Component, VERSION } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  heroes: Hero[] = [];
  arrTemp: any[] = [];

  constructor(private heroService: HeroService) {
    console.log('PRUEBAASSS');
    let array = {
      dataForm: [
        { codInf: 11, tipInfF: 'CAJEROS PROPIOS ', redConci: 8, fechaCon: 201 },
        { codInf: 10, tipInfF: 'CAJEROS PROPIOS ', redConci: 8, fechaCon: 201 },
      ],
    };
    console.log('INITIAL', array);

    array.dataForm.forEach((obj: any) => {
      console.log('--->', obj);
      this.arrTemp.push(obj);
    });
    console.log('FINAL', this.arrTemp[0]);
  }

  add(name: string): void {
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
}
