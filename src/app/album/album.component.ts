import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  id: any;
  album: any;

  private routeSubscription: any;
  private albumSubscription: any;
  private favouriteSubscription: any;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private service: MusicDataService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.albumSubscription = this.service.getAlbumById(this.id).subscribe((album) => {
        this.album = album;
      });
  }

  addToFavourites(id: string) {
    this.favouriteSubscription = this.service.addFavourite(id).subscribe(
      (response) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1000,
        });
      },
      (exception) => {
        this.snackBar.open('Unable to add song to Favourites', 'Done', {
          duration: 1000,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.albumSubscription?.unsubscribe();
    this.favouriteSubscription?.unsubscribe();
  }
}
