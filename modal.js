const $background = document.getElementById("modal-background");
const $modalContainer = document.getElementById("modal-container");
const $addButton = document.getElementById("add-to-list");
const $h2main = document.getElementById('h2main');
let currentMovie = {};

function createModal(data) {
  currentMovie = data;

  $modalContainer.innerHTML = `
  <h2 >${data.Title} - ${data.Year}</h2>
        <section id="modal-body">
          <img id="movie-poster" src=${data.Poster} alt="">
          <div id="movie-info">
            <h3 id="movie-plot">${data.Plot}</h3>
            <div id="movie-cast">
              <h4>Elenco:</h4>
              <h5>${data.Actors}</h5>
            </div>
            <div id="movie-geore">
              <h4>Gênero: </h4>
              <h5>${data.Genre}</h5>
            </div>
          </div>
        </section>
        <section id="modal-footer">
          <button id="add-to-list" onclick='{addCurrentMovieToList()}'>Adicionar a lista</button>
        </section>`;
}

function closeModal() {
  $overlay.classList.remove("open");
}
$background.addEventListener("click", closeModal);

function addCurrentMovieToList() {
  if ( isMovieAlReadyOnList(currentMovie.imdbID) ){
    notie.alert({type: 'error', text: "Filme já está na sua lista!!"});
      return;
  }
  addToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  $h2main.style.display = "none";
  closeModal();

}