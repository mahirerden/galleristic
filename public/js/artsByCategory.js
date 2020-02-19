$(document).ready(function () {

  var categorySelect = $("#category");

  getCategory();

  function getCategory() {
    $.get("/api/category", renderCategoryList);
  }

  function renderCategoryList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    categorySelect.empty();
    console.log(rowsToAdd);
    console.log(categorySelect);
    categorySelect.append(rowsToAdd);
    categorySelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createCategoryRow(category) {
    var listOption = $("<option>");
    listOption.attr("value", category.id);
    listOption.text(category.name);
    return listOption;
  }
});