import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { fadeInDownOnEnterAnimation, fadeInExpandOnEnterAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [ slideInRightOnEnterAnimation({ delay: 2000, duration: 500 }), slideInLeftOnEnterAnimation({ delay: 2000, duration: 500 }) ]
})
export class NavbarComponent implements OnInit {
  profileMenuClick$ = this.ctxMenuService.onItemClick().pipe(
    filter( ({ tag }) => tag === 'profile-menu'),
    map( ({ item: { title } }) => title ),
  );

  constructor( private ctxMenuService: NbMenuService, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.profileMenuBehavior();
  }

  profileMenuBehavior() {
    this.profileMenuClick$.subscribe( item => {
      if( item === 'Cerrar Sesión' ) {
        this.authService.logOut();
        this.router.navigateByUrl('/login')
      }
    });
  }

}
