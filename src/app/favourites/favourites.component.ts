import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];

  private retrieveFavorites: any;
  private removeFromFavorites: any;

  constructor(private service: MusicDataService, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.retrieveFavorites = this.service.getFavourites().subscribe(res => {
      this.favourites = res.tracks;
      
    });
  }

  removeFavourite(id: string) :void {
    this.removeFromFavorites = this.service
      .removeFavourite(id)
      .subscribe((response) => {
        this.favourites = response.tracks;
      });
      this.snackBar.open('Removing from Favourites...', 'Done', {
        duration: 1000,
      });
  }

  ngOnDestroy(): void {
    this.retrieveFavorites?.unsubscribe();
    this.removeFromFavorites?.unsubscribe();
  }
}