import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favouritesList: Array<any> = [];
  
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id:number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}` , { headers: { "Authorization": `Bearer ${token}`}});
    }))
  }


  getAlbumsByArtistId(id:number): Observable<any> {
    let limit = 50 , include_groups = 'album,single';
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => { return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include_groups}&limit=${limit}`, { headers: { Authorization: `Bearer ${token}` }});})
    );
  }

  getAlbumById(id:number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}` , { headers: { "Authorization": `Bearer ${token}`}});
    }))
  }

  searchArtists(
    searchString: string
  ): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  addToFavourites(id: string){
    if (id == null || this.favouritesList.length >= 50){
      return false;
    } else {
      this.favouritesList.push(id);
      return true;
    }
  }


  removeFromFavourites(id:string): Observable<any> {
    this.favouritesList.splice(this.favouritesList.indexOf(id) , 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any>{

    let ids = this.favouritesList.join(',');

    if(this.favouritesList.length > 0){
      
      return this.spotifyToken.getBearerToken().pipe(mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`,{headers: {Authorization: `Bearer ${token}`}}
      )}
      ))
    } else {
      return new Observable((o) => {o.next([])})
    }
  }
}