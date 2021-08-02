import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
  userLogged: BehaviorSubject<any> = this.userService.userLogged;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  loading: boolean =false;

  constructor(
    private ctxMenuService: NbMenuService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private spinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.profileMenuBehavior();
    setTimeout(() => {
      this.loading = true;
    }, 500);
    this.userService.userLogged.subscribe( data => {
      if( !data?.image ) this.spinnerService.show('navImage');
      if( data?.image ) this.spinnerService.hide('navImage');
    })
  }

  profileMenuBehavior() {
    this.profileMenuClick$.subscribe( item => {
      if( item === 'Cerrar Sesión' ) {
        this.authService.logOut();
        this.router.navigateByUrl('/login')
      }
    });
  }

  search( value: string ) {
    const searchTerm = value.trim();
    this.router.navigate([ 'home/search', searchTerm ]);
  }

}
