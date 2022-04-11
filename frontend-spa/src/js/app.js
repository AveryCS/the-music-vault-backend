import home from "./home.js";
import header from "./header.js";
import footer from './footer.js';
import albumView from "./albumView.js";
import {
    modals
} from "./modal.js";
import {
    albums
} from "./albumsJson.js";
import {
    songs
} from "./songsJson.js";
import songView from "./songView.js";

const containerEL = document.querySelector(".container");

function makeHomeView() {
    fetch("http://localhost:8080/albums")
    .then(res => res.json())
    .then(albums => {
        makeHomeViewFromJson(albums)
    }).then(() => {
        modals('addNewAlbum')

    })
}
makeHomeView();

function aboutUsModal(){
    const aboutTheCreators = containerEL.querySelector(".aboutUs");
    const aboutUsModal = containerEL.querySelector(".aboutusmodal");
    const closeModal = containerEL.querySelector(".closeModal");
    aboutTheCreators.addEventListener("click", () => {
        aboutUsModal.style.display = "block";
        closeModal.style.display = "block";
        console.log("working");       
    })
    
    closeModal.addEventListener("click", () => {
        aboutUsModal.style.display = "none";
        closeModal.style.display = "none";
    })
}

function makeHomeViewFromJson(albums) {
    containerEL.innerHTML = header();
    containerEL.innerHTML += home(albums);
    containerEL.innerHTML += footer();

    aboutUsModal();

    const flipCardEl = containerEL.querySelectorAll(".flip-card");
    flipCardEl.forEach(album => {
        let albumIdEl = album.querySelector(".id_field");
        const albumH1 = album.querySelector(".albumTitle");
        
        albumH1.addEventListener("click", () => {
            albums.forEach(albumsJson => {
                if (albumsJson.id == albumIdEl.value) {
                    makeAlbumView(albumsJson);
                }
            })
        })

        const deleteBtn = album.querySelector(".deleteBtn")
        deleteBtn.addEventListener("click", () => {

            fetch("http://localhost:8080/albums/" + albumIdEl.value, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(newAlbums => {
                makeHomeView();
            })
        })
        
        const editBtn = album.querySelector(".updateBtn");
        const requiredInputAlbum = album.querySelector(".requiredInputAlbum");
        editBtn.addEventListener("click", () => {
            requiredInputAlbum.style.visibility = "hidden";
            const updateInput = album.querySelector(".update-album-title");
            if(updateInput.value != ""){
                fetch("http://localhost:8080/albums/" + albumIdEl.value, {
                    method: "PATCH",
                    body: updateInput.value
                })
                .then(res => res.json())
                .then(newAlbums => {
                    makeHomeViewFromJson(newAlbums);
                })
            }
            else {
                requiredInputAlbum.style.visibility = "visible";
            }
        })
    })

    const albumTitleInput = containerEL.querySelector(".album-title");
    const imageUrlInput = containerEL.querySelector(".ImgUrl");
    const recordLabelInput = containerEL.querySelector(".newRecordLabel");
    const requiredEl = containerEL.querySelector(".required");
    const addAlbumBtn = containerEL.querySelector(".addAlbumSubmitBtn");
    addAlbumBtn.addEventListener("click", () => {
        if (albumTitleInput.value != "" && imageUrlInput.value != "" && recordLabelInput.value != "") {
            const newAlbumJson = {
                "title": albumTitleInput.value,
                "imageUrl": imageUrlInput.value,
                "recordLabel": recordLabelInput.value,
            }
            requiredEl.style.visibility = "hidden";
            fetch(`http://localhost:8080/albums/addAlbum`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAlbumJson)
            })
            .then(res => res.json())
            .then(album => {
                makeHomeView(album);
            })
        }
        else{
            requiredEl.style.visibility = "visible";
        }

    })
}


function makeAlbumView(album) {
    containerEL.innerHTML = header();
    containerEL.innerHTML += albumView(album);
    containerEL.innerHTML += footer();

    aboutUsModal();

    bindSongViewFromJson(album);

    const backBtn = containerEL.querySelector(".backBtn");
    backBtn.addEventListener("click", () => {
        makeHomeView();
    })
    modals('addNewSong');

    const songTitleInput = containerEL.querySelector(".song-title");
    const songUrlInput = containerEL.querySelector(".songUrl");
    const durationInput = containerEL.querySelector(".duration");
    const artistNameInput = containerEL.querySelector(".artistName")
    const addNewSongBtn = containerEL.querySelector(".addNewSongBtn");
    const requiredEl1 = containerEL.querySelector(".required");
    addNewSongBtn.addEventListener("click", () => {

        if (songTitleInput.value != "" && songUrlInput.value != "" && durationInput.value != "" && artistNameInput.value != ""){
            const newSongJson = {
                "title": songTitleInput.value,
                "link": songUrlInput.value,
                "duration": durationInput.value,
                "artist": artistNameInput.value,
                "comments": []
            }
            requiredEl1.style.visibility = "hidden";
            fetch(`http://localhost:8080/albums/${album.id}/addSong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSongJson)
            })
            .then(res => res.json())
            .then(album => {
                makeAlbumView(album);

            })
        }
        else{
            requiredEl1.style.visibility = "visible";
        }
    })

    const albumCmtBtn = containerEL.querySelector(".albumSubmitBtn");
    const authorInput = containerEL.querySelector("#nameInput");
    const ratingInput = containerEL.querySelector("#ratingInput");
    const commentInput = containerEL.querySelector("#commentInput");
    const requiredComments = containerEL.querySelector(".requiredComments");
    albumCmtBtn.addEventListener("click", () => {
        if(authorInput.value!="" && ratingInput.value!="" && commentInput.value!=""){
            requiredComments.style.visibility = "hidden";
            const newCommentJson = {
                "author": authorInput.value,
                "rating": ratingInput.value,
                "comment": commentInput.value
            }
            fetch(`http://localhost:8080/albums/${album.id}/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommentJson)
            })
            .then(res => res.json())
            .then(newComment => {
                makeAlbumView(newComment);
            })
        }
        else{
            requiredComments.style.visibility = "visible";
        }
    })

}



function bindSongViewFromJson(album) {
    const cardEl = containerEL.querySelectorAll(".song");
    cardEl.forEach(song => {
        let songIdEl = song.querySelector(".songId_field");
        const songH1 = song.querySelector(".songTitle");
        songH1.addEventListener("click", () => {
            album.songs.forEach(songJson => {
                if (songJson.id == songIdEl.value) {

                    makeSongView(songJson, album);
                }
            })
        })

        const editSongBtn = song.querySelector(".updateSongBtn");
        const requiredInputEl1 = song.querySelector(".requiredInputSong")
        editSongBtn.addEventListener("click", () => {
            const updateSongInput = song.querySelector(".update-song-title");
            if(updateSongInput.value!=""){
                requiredInputEl1.style.visibility = "hidden";
                fetch("http://localhost:8080/songs/" + songIdEl.value, {
                    method: "PATCH",
                    body: updateSongInput.value
                })
                .then(res => res.json())
                .then(newSongs => {
                    makeAlbumView(newSongs);
                })
            }
            else{
                requiredInputEl1.style.visibility = "visible";
            }
        })

        const deleteSongBtn = song.querySelector(".deleteBtn")
        deleteSongBtn.addEventListener("click", () => {
            fetch("http://localhost:8080/songs/" + songIdEl.value, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(newSongs => {
                makeAlbumView(newSongs);
            })
        })
    })
}

function makeSongView(songJson, albumJson) {
    containerEL.innerHTML = header();
    containerEL.innerHTML += songView(songJson, albumJson);
    containerEL.innerHTML += footer();
    aboutUsModal();

    const backBtn = containerEL.querySelector(".backBtn");
    backBtn.addEventListener("click", () => {
        makeAlbumView(albumJson);
    })

    const songCmtBtn = containerEL.querySelector(".songReviewSubmitBtn");
    const songAuthorInput = containerEL.querySelector("#nameInput");
    const songRatingInput = containerEL.querySelector("#ratingInput");
    const songCommentInput = containerEL.querySelector("#commentInput");
    const requiredCommentsEl1 = containerEL.querySelector(".requiredCommentsSong");
    songCmtBtn.addEventListener("click", () => {
       if(songAuthorInput.value!=""&& songRatingInput.value!="" && songCommentInput.value!="" ){
            requiredCommentsEl1.style.visibility = "hidden";
            const newSongCommentJson = {
                "author": songAuthorInput.value,
                "rating": songRatingInput.value,
                "comment": songCommentInput.value
            }
            fetch(`http://localhost:8080/songs/${songJson.id}/addComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSongCommentJson)
            })
            .then(res => res.json())
            .then(newAlbums => {
                newAlbums.forEach(album => {
                    album.songs.forEach(song => {
                        if (song.id == songJson.id) {
                            makeSongView(song, album)
                        }
                    })
                })
            })
        }
        else{
            requiredCommentsEl1.style.visibility = "visible";

        }
    })
}