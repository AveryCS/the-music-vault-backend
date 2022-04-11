export default function home(albums) {

    return `
    <main class="main">
        <h1 class="album">Albums in the Vault</h1>
        <div class="allAlbums">
            ${albums.map(album => {
            return ` 
                <div class= "flipcardContainer">
                    <article class="flip-card">
                        <section class="inner">
                            <div class="card-front">
                                <img src="${album.imageUrl}" alt="Avatar" style="width:375px;height:375px;">
                            </div>
                            <section class="card-back">
                                <h1 class="albumTitle">${album.title}</h1>
                                <h1 class="averageAlbumRating">Album Rating:<br>${album.averageAlbumRating}</h1>
                                <input type="hidden" class="id_field" value="${album.id}" > 
                                <p class="recordLabel">Record Label:<br>${album.recordLabel}</p>
                                <p class="requiredInputAlbum">*All fields are required*</p>
                                <div class="updateIcon">
                                    <input type="text" class="update-album-title" placeholder="Edit Album Title"/>
                                    <button class="updateBtn">Submit</button>
                                    <img class="deleteBtn" src="./images/delete1.png" alt="delete icon">
                                </div>
                            </section>
                        </section>
                    </article>
                </div>`
            }).join("")
            }
            <article class="addNewAlbum" id="addNewAlbum">
                <section class="addAlbum">
                    <img src="./images/plus.png" alt="Avatar" style="height: 3cm;">
                </section>
                <h3>Add New Album</h3>
            </article>

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div class="content">
                        <p class="required">*All fields are required*</p>
                        <input type="text" class="album-title centerInput" placeholder="Album Title" /><br>
                        <input type="text" class="ImgUrl centerInput" placeholder="Album Cover URL" /><br>
                        <input type="text" class="newRecordLabel centerInput" placeholder="Record Label" /><br>
                        <button class="addAlbumSubmitBtn">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </main>`;
}