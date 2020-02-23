$(document).ready(function () {
  var artsbycategoryForm = $("#artsbycategory");
  var categorySelect = $("#category");
  var arts_container = $(".arts_container");
  var arts;
  var categoryId;

  getCategories();

  function getCategories(){
    $.get("/apis/api/category", renderCategoryList);
  }

  function renderCategoryList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryRow(data[i]));
    }
    categorySelect.empty();
    console.log(rowsToAdd);
    console.log(categorySelect);
    categorySelect.append(rowsToAdd);
    categorySelect.val(0);
  }

  function createCategoryRow(category) {
    var listOption = $("<option>");
    listOption.attr("value", category.id);
    listOption.text(category.name);
    return listOption;
  }

  $("#category").change(function(e){
    e.preventDefault();
    categoryId = $(this).val();
    console.log(categoryId);
  });

  $(artsbycategoryForm).on("submit", getArts);

  function getArts(e){
    e.preventDefault();
    if (categoryId) {
      categoryId = "/?categoryid=" + categoryId;
    } else {
      categoryId = "";
    }
    $.get("/apis/api/artsbycategory" + categoryId, function(data) {
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
    var artsToAdd = [];
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