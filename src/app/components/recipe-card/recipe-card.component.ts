import { Component, Input, OnInit } from '@angular/core';
import { NbPosition } from '@nebular/theme';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  position: NbPosition = NbPosition.BOTTOM_START;
  @Input() recipe: any = null;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';

  constructor( ) { }

  ngOnInit(): void { }

}
