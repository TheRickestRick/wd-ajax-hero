(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbID}`);
      $plot.add(`#${movie.imdbID}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();

      $plot.click(function() {
        $.get(`https://omdb-api.now.sh/?i=${movie.imdbID}`)
          .done((data)=>{
            console.log(data.Plot);
            $modalText.append(data.Plot);
          })
      })

    }
  };

  let searchBox = document.getElementById('search');
  let searchButton = document.getElementById('searchButton');
  let searchQuery;

  searchButton.addEventListener("click", function(e) {
    if(searchBox.value !== "") {
      e.preventDefault();
      searchQuery = searchBox.value;
      searchBox.value = "";
      $.get(`https://omdb-api.now.sh/?s=${searchQuery}`)
        .done((data)=>{
          movies = data.Search;
          renderMovies()
        })
    } else {
      e.preventDefault();
      console.log("You didn't search anything.")
    }
  })

})();
