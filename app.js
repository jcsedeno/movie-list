class Movie {
	constructor( title, director, year, trailerLink ) {
		this.title = title;
		this.director = director;
		this.year = year;
		this.trailerLink = trailerLink;

	}
}

class UI {
	addMovie( movie ) {
		setTimeout( function( ) {

			const
				movieList = document.querySelector( '#movie-list' ),
				list = document.createElement( 'div' );
			list.classList = 'col-4 movie-card';
			list.innerHTML = `
			<div class="content">
				<h1>${movie.title} </h1>
			<p>Director(s) :${movie.director} </p>
			<p>Released in :${movie.year} </p>
			<p> <a href="${movie.trailerLink}" class="trailer-link"> Watch Trailer <i class="fa fa-play"></i> </a> </p>
			<p> <a href="#" class="delete"> <i class="fa fa-trash"></i> </a> </p>
			</div>
			`;
			movieList.appendChild( list );
			document.getElementById( 'loading' ).style.display = 'none';
		}, 3000 );

	}
	showAlert( message, className ) {
		const errBox = document.createElement( 'div' );

		errBox.className = `alert ${className}`;
		errBox.appendChild( document.createTextNode( message ) );
		const container = document.querySelector( '.container' );
		const form = document.querySelector( '#movie-form' );
		container.insertBefore( errBox, form );

		setTimeout( function( ) {
			document.querySelector( '.alert' ).remove( );
		}, 3000 );
	}

	clearFields( ) {
		document.querySelector( '#title' ).value = "";
		document.querySelector( '#director' ).value = "";
		document.querySelector( '#year' ).value = "";
		document.querySelector( '#url-trailer' ).value = "";
	}
}

class Store {
	static fetchMovies( ) {
		document.getElementById( 'loading' ).style.display = 'block';
		setTimeout( function( ) {
			document.getElementById( 'loading' ).style.display = 'none';
		}, 3000 );
		let movies;
		if ( localStorage.getItem( 'movies' ) === null ) {
			movies = [ ];

		}
		else {
			movies = JSON.parse( localStorage.getItem( 'movies' ) );

		}

		return movies;
	}
	static displayMovies( ) {
		const movies = Store.fetchMovies( );
		movies.forEach( function( movie ) {
			const ui = new UI;

			ui.addMovie( movie )
		} )
	}

	static addMovies( movie ) {
		const movies = Store.fetchMovies( );
		movies.push( movie );

		localStorage.setItem( 'movies', JSON.stringify( movies ) );
	}
	static removeMovie( year ) {
		const movies = Store.fetchMovies( );
		movies.forEach( function( movie, index ) {
			if ( movie.year = year ) {
				movies.splice( index, 1 )
			}
		} )

		localStorage.setItem( 'movies', JSON.stringify( movies ) );

	}
}
document.addEventListener( 'DOMContentLoaded', Store.displayMovies );
document.querySelector( '#movie-form' ).addEventListener( 'submit', function( e ) {

	const
		title = document.querySelector( '#title' ).value,
		director = document.querySelector( '#director' ).value,
		year = document.querySelector( '#year' ).value,
		trailerLink = document.querySelector( '#url-trailer' ).value,

		movie = new Movie( title, director, year, trailerLink ),
		ui = new UI( );

	if ( title === '' || director === '' || year === '' ) {

		ui.showAlert( 'Please fill in all fields', 'error' );
	}
	else {
		document.getElementById( 'loading' ).style.display = 'block';
		setTimeout( function( ) {
			if ( trailerLink === '' ) {
				trailerLink.value = '';
			}
			ui.addMovie( movie );

			Store.addMovies( movie );
			ui.showAlert( 'Movie Added', 'success' );
			document.getElementById( 'loading' ).style.display = 'none';

		}, 3000 )

	}

	ui.clearFields( );
	e.preventDefault( );
} );

document.getElementById( 'movie-list' ).addEventListener( 'click', function( e ) {
	const ui = new UI( );
	if ( e.target.parentElement.className === 'delete' ) {
		document.getElementById( 'loading' ).style.display = 'block';
		setTimeout( function( ) {
			console.log( e.target );
			e.target.parentElement.parentElement.parentElement.parentElement.remove( );
			Store.removeMovie( e.target.parentElement.parentElement.previousElementSibling.textContent );
			ui.showAlert( 'Movie removed', 'success' );
			document.getElementById( 'loading' ).style.display = 'none';
			e.preventDefault( );
		}, 3000 );

	}
	else {
		console.log( 'not target' );
	}

} )
