import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  albumSub: any;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService , private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  let id = this.route.snapshot.params['id'];
  this.musicService.getAlbumById(id).subscribe((data) => (this.album = data));
}

addToFavourites(trackID:string){

  if(this.musicService.addToFavourites(trackID)){
    this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
  }
}
}