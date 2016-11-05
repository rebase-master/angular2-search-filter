import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'partials/app.html'
})

export class AppComponent{

    name = 'Khan';
    artists = ['Barot Bellingham', 'Jonathan Ferrar', 'Hillary Post'];

    onClick(name){
        //this.name = e.target.innerHTML;
        this.name = name;
    }

    addArtist(myArtist){
        this.artists.push(myArtist);
    }

}

