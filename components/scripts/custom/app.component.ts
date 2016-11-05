import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'partials/app.html',
    styleUrls: ['css/app.css']
})

export class AppComponent{

    name = 'Khan';
    artists = ['Barot Bellingham', 'Jonathan Ferrar', 'Hillary Post'];

    onClick(name, element){
        //this.name = e.target.innerHTML;
        this.name = name;
        element.style.backgroundColor="#FECE4E";
    }

    addArtist(myArtist){
        this.artists.push(myArtist);
    }

}

