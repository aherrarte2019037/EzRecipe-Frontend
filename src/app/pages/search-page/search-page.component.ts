import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, slideInDownOnEnterAnimation, slideInLeftOnEnterAnimation, slideInUpOnEnterAnimation } from 'angular-animations';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  animations: [ fadeInOnEnterAnimation({ duration: 300 }), fadeInUpOnEnterAnimation({ translate: '50px' }) ]
})
export class SearchPageComponent implements OnInit {
  searchTerm: string = '';
  results: any = {};
  imgUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor( private activatedRoute: ActivatedRoute, private recipeService: RecipeService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.searchTerm = params['term'];
      this.search( this.searchTerm );
      if( this.searchInput ) this.searchInput.nativeElement.value = this.searchTerm; 
    })
  }

  search( term: string ) {
    this.recipeService.searchByTerm( term ).subscribe(
      data => this.results = data
    )
  }

  searchInputChange( value: string ) {
    if( value.length > 2 && value !== this.searchTerm ) {
      this.searchTerm = value.trim();
      this.search( this.searchTerm )
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.results = { recipes: [], users: [] };
    this.searchInput.nativeElement.value = this.searchTerm;
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.value = this.searchTerm;
  }

}
