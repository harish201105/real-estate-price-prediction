function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");
  var loader = document.getElementById("loader");
  var submitButton = document.querySelector(".submit");

  estPrice.style.opacity = 0;
  estPrice.innerHTML = "";
  loader.style.display = "block";
  submitButton.disabled = true;
  submitButton.style.opacity = 0.6;

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function (data, status) {
    console.log(data.estimated_price);
    loader.style.display = "none";
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    estPrice.style.opacity = 1;
    submitButton.disabled = false;
    submitButton.style.opacity = 1;
    console.log(status);
  }).fail(function () {
    loader.style.display = "none";
    estPrice.innerHTML = "<h2>Failed to fetch price. Try again!</h2>";
    estPrice.style.opacity = 1;
    submitButton.disabled = false;
    submitButton.style.opacity = 1;
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Choose a Location", ""));
      for (var i = 0; i < locations.length; i++) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;