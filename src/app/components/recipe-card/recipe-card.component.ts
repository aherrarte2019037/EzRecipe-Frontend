import { Component, Input, OnInit } from '@angular/core';
import { NbPosition, NbTrigger } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  position: NbPosition = NbPosition.BOTTOM_START;
  @Input() recipe: any = null;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  userLogged$: Object = this.userService.userLogged;
  
  constructor( private userService: UserService ) { }

  ngOnInit(): void { }

}
