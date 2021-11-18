import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
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

  constructor(private service: MusicDataService) {}

  ngOnInit(): void {
    this.retrieveFavorites = this.service
      .getFavourites()
      .subscribe((response) => {
        this.favourites = response.tracks;
      });
  }

  removeFromFavourites(id: string) {
    this.removeFromFavorites = this.service
      .removeFromFavourites(id)
      .subscribe((response) => {
        this.favourites = response.tracks;
      });
  }

  ngOnDestroy(): void {
    this.retrieveFavorites?.unsubscribe();
    this.removeFromFavorites?.unsubscribe();
  }
}