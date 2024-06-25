const $searchButton = document.getElementById("search-button");
const $overlay = document.getElementById("modal-overlay");
const $movieName = document.getElementById("movie-name");
const $movieYear = document.getElementById("movie-year");
const $movieList = document.getElementById("movie-list");

let movielist = JSON.parse(localStorage.getItem("movieList")) ?? [];

$searchButton.addEventListener("click", async function () {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("data: ", data);
    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    createModal(data);
    $overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }

  function movieNameParameterGenerator() {
    if (!$movieName.value) {
      throw new Error("O nome do filme deve ser informado");
    }
    return $movieName.value.split(" ").join("+");
  }
  function movieYearParameterGenerator() {
    if (!$movieYear.value) {
      return " ";
    }
    if (
      $movieYear.value.length !== 4 /*|| Number.isNaN(Number(movieYear.value))*/
    ) {
      throw new Error("Ano do filme inválido");
    }
    return `&y=${$movieYear.value}`;
  }
});
function isMovieAlReadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movielist.find(doesThisIdBelongToThisMovie));
}
function addToList(movieObject) {
  movielist.push(movieObject);
}
function removeToList(id) {
  notie.confirm({
    text: 'Deseja remover o filme de sua lista',
    submitText: "Sim",
    cancelText: "Não",
    position: 'top',
    submitCallback: function removeMovie(){
      movielist = movielist.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      if ($movieList.innerText === '') {
        $h2main.style.display = "inline-block";
      }
      updateLocalStorage();
    }
  })
  
}

function updateUI(movieObject) {
  $movieList.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
  <img src="${movieObject.Poster}" alt="Poster de ${movieObject.Title}.">
  <button class="removeButton" onclick="{removeToList('${movieObject.imdbID}')}"><i class="bi bi-trash"></i> Remover</button>
</article>`;
}
function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movielist));
}

for (const movieInfo of movielist) {
  updateUI(movieInfo);
}
