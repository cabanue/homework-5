var _db;

function initFireBase() {
  _db = firebase.firestore();
}

function displayAlbums(doc) {
  $("#albums").append(`
    <div class="album">
        <h1 class="album__name">${doc.data().Name}</h1>
        <div class="album__info">
            <div class="album__info__cover" style="background-image:url(${
              doc.data().Photo
            })"></div>
            <div class="album__info__right">
                <div class="album__info__right__artist">
                  <p>Artist</p>
                  <p>${doc.data().Artist}</p>
                </div>
                <div class="album__info__right__genre">
                  <p>Genre</p> 
                  <p>${doc.data().Genre}</p>
                </div>
            </div>
        </div>
    </div>
    `);
}

function initListeners() {
  $("#pop").click(function (e) {
    $("#home-title").html("Pop");
    $("#albums").html("");
    _db
      .collection("Albums")
      .where("Genre", "==", "Pop")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          displayAlbums(doc);
        });
      });
  });

  $("#alt").click(function (e) {
    $("#home-title").html("Alternative");
    $("#albums").html("");
    _db
      .collection("Albums")
      .where("Genre", "==", "Alternative")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          displayAlbums(doc);
        });
      });
  });

  $("#ost").click(function (e) {
    $("#home-title").html("Soundtrack");
    $("#albums").html("");
    _db
      .collection("Albums")
      .where("Genre", "==", "Soundtrack")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          displayAlbums(doc);
        });
      });
  });

  $("#all").click(function (e) {
    getAllAlbums();
  });
}

function getAllAlbums() {
  $("#home-title").html("All Albums");
  $("#albums").html("");
  _db
    .collection("Albums")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        displayAlbums(doc);
      });
    });
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFireBase();
    getAllAlbums();
    initListeners();
  } catch {
    console.error(e);
  }
});
