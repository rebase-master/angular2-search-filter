import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'partials/app.html',
    styles: [
        `.btn {
            display: inline-block;
            padding: 12px 24px;
            margin-bottom: 0;
            font-size: 1.3rem;
            line-height: 140%;
            text-align: center;
            text-decoration: none;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 4px;
            color: white;
            background-color: #2D8BCF;
            background-size: 18px 18px;
            min-width: 28px;
            min-height: 28px;
            background-position: center center;
            background-repeat: no-repeat;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                 -o-user-select: none;
                    user-select: none;
        }`
    ]
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

