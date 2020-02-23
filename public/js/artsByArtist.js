$(document).ready(function () {
  var artsbyartistForm = $("#artsbyartist");
  var artist_select = $("#artist_select");
  var arts_container = $(".arts_container");
  var arts;
  var artistId;

  getArtists();

  function getArtists(){
    $.get("/apis/api/artist", renderArtistList);
  }

  function renderArtistList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createArtistRow(data[i]));
    }
    artist_select.empty();
    artist_select.append(rowsToAdd);
    artist_select.val(0);
  }

  function createArtistRow(artist) {
    var listOption = $("<option>");
    listOption.attr("value", artist.id);
    listOption.text(artist.name);
    return listOption;
  }

  $("#artist_select").change(function(e){
    e.preventDefault();
    artistId = $(this).val();
    console.log(artistId);
  });

  $(artsbyartistForm).on("submit", getArts);

  function getArts(e){
    e.preventDefault();
    if (artistId) {
      artistId = "/?artistid=" + artistId;
    } else {
      artistId = "";
    }
    $.get("/apis/api/artsbyartist" + artistId, function(data) {
      arts = data;
      if (!arts || !arts.length) {
        arts_container.empty();
      }
      else {
        initializeRows();
      }
    });
   }

   function initializeRows() {
    arts_container.empty();
    let artsToAdd = [];
    for (var i = 0; i < arts.length; i++) {
      artsToAdd.push(createNewRow(arts[i]));
    }
    arts_container.append(artsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(art) {
    var newArtCard = $("<div>");
    newArtCard.addClass("artCard");
    var newArtCardHeading = $("<div>");
    newArtCardHeading.addClass("card-header");
    var newArtImage = $("<img>");
    newArtImage.addClass("artImage");
    var newArtCardBody = $("<div>");
    newArtCardBody.addClass("card-body");
    var newArtBody = $("<p>");
    var newArtTitle = $("<h5>");    
    var newArtYear = $("<h6>");
    var newArtName = $("<h6>");
    var newArtPrice = $("<h6>");
    newArtImage.attr("src", art.file)
    var title = "<b>Title: </b>" + art.title;
    var year = "<b>Year: </b>" + art.year;
    var artistName = "<b>Artist: </b>" + art.Artist.name;
    var price = "<b>Price: </b>" + art.price;
    var newCartButton = $('<button class="cartButton">Add Cart</button>');
    newArtTitle.html(title);
    newArtYear.html(year);
    newArtName.html(artistName);
    newArtPrice.html(price);
    newArtCardHeading.append(newArtImage);
    newArtCardBody.append(newArtTitle);
    newArtCardBody.append(newArtYear);
    newArtCardBody.append(newArtName);
    newArtCardBody.append(newArtName);
    newArtCardBody.append(newArtPrice);
    newArtCardBody.append(newCartButton);
    newArtCardBody.append(newArtBody);
    newArtCard.append(newArtCardHeading);
    newArtCard.append(newArtCardBody);
    newArtCard.data("art", art);
    return newArtCard;
  }
});