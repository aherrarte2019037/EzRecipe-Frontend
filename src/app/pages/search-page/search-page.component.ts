import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, slideInDownOnEnterAnimation, slideInLeftOnEnterAnimation, slideInUpOnEnterAnimation } from 'angular-animations';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  animations: [ fadeInOnEnterAnimation({ duration: 300 }), fadeInUpOnEnterAnimation({ translate: '50px' }) ]
})
export class SearchPageComponent implements OnInit {
  searchTerm: string = '';
  results: any = {};
  userLogged: any;
  booleanPurchased: boolean = false;
  recipes: any;
  imgUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor( private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router, private userService: UserService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
    ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data => { this.userLogged = data
    });
    this.activatedRoute.params.subscribe( params => {
      this.searchTerm = params['term'];
      this.search( this.searchTerm );
      if( this.searchInput ) this.searchInput.nativeElement.value = this.searchTerm;
    })
  }

  purchaseRecipe(id: string){

    this.userService.purchasedRecipes(id).subscribe(
      data=>{
        this.booleanPurchased = !this.booleanPurchased;
        this.showToastBuy();
        this.userLogged.purchasedRecipes.push(id)
        this.userLogged.ezCoins-=45;
        this.userService.userLogged.next(this.userLogged);
      },
      error=>{
        this.showToastInsufficientEzCoins(2000,"success");
      }
    )

  }

  showToastBuy(){

    this.toastrService.show( '', `Receta Comprada`, { status: 'primary', icon: 'shopping-cart-outline' });
  }

  showToastInsufficientEzCoins(duration: any,status: NbComponentStatus) {
    this.toastrService.show( '', `Monedas insuficientes`, { status: 'warning', icon: 'alert-circle' });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getIdRecipe(id: any){
    this.recipeService.getIdRecipe(id).subscribe(
      data => {
        this.recipes = data.foundRecipes;
      }
    )
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

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }

  purchasedRecipe(id:string){
    const ifPurchased = this.userLogged.purchasedRecipes.some((purchased:any) => purchased === id)
    return ifPurchased
  }

}
