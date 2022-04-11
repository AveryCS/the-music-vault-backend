export default function albumView(album) {
    return `
    <main class="main">
        <h2 class="albumTitleHeader">Album:<br></h2>
        <h2 class="albumTitle">${album.title}</h2>
        <br><br>
        
        <img class="backBtn" src="./images/backBtn.png" alt="back button"> 
        <h2 class="albumSongList">Song List<h2>
        <div class="allSongs">
            ${
                album.songs.map(song => {
                    return `
                    <article class="flip-card song" >
                        <section class="inner">
                            <div class="card-front song-front">
                                <img src="${album.imageUrl}" alt="Avatar" style="width:375px;height:375px;">
                            </div>
                            <section class="card-back song-back">
                                <h1 class="songTitle">${song.title}</h1>
                                <p class="artistLabel">Artist: ${song.artist}</p>
                                <p class="averageSongRating">Song Rating: ${song.averageSongRating}</p>
                                <p class="durationLabel">Duration: ${song.duration}</p>
                                <a class="linkLabel" href="${song.link}">Click Here To Listen</a>
                                <input type="hidden" class="songId_field" value="${song.id}" > 
                                <p class="requiredInputSong">*All fields are required*</p>
                                <div class="updateIcon">
                                    <input type="text" class="update-song-title" placeholder="Edit Song Title" />
                                    <button class="updateSongBtn">Submit</button>
                                    <img class="deleteBtn" src="./images/delete1.png" alt="delete icon">
                                </div>
                                
                            </section>
                        </section>
                    </article>`
                }).join("")
            }
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div class="content">
                        <p class="required">*All fields are required*</p>
                        <input type="text" class="song-title centerInput" placeholder="Song Title" />
                        <input type="text" class="songUrl centerInput" placeholder="Song URL" />
                        <input type="text" class="duration centerInput" placeholder="Song Duration" />
                        <input type="text" class="artistName centerInput" placeholder="Artist Name" />
                        <button class="addNewSongBtn" type="submit">Submit</button>
                    </div>
                </div>
            </div>
            <article class="addNewSong" id="addNewSong">
                <section class="addSong">
                    <img src="./images/plus.png" alt="Avatar" style="height: 3cm;">
                </section>
                <h3>Add New Song</h3>
            </article>
        </div>
            <article class="albumReview">
                <div class="reviewInput">
                    <p class="requiredComments">*All fields are required*</p>
                    <label for="fullName">Full Name:</label><br>
                    <input id="nameInput" type="text" name="fullName" placeholder="John Doe"><br>
                    <label for="rating">Rate The Album:</label><br>
                    <input id="ratingInput" type="number"  name="rating" placeholder="Number required"><br> 
                    <label for="comment">Comment:</label><br>
                    <input id="commentInput" type="text" name="comment" placeholder="Best song!" ><br>
                    <button class="albumSubmitBtn">Submit</button>
                </div> 
                ${
                    album.comments.map(comment => {
                        return`  
                        <div class="displayReview">
                            <img class="profileImg" src="./images/profile.png" alt="profile icon">
                            <section class="commentDisplay">
                                <h3 class="name">${comment.author}</h3>
                                <h4 class="albumRating">${comment.rating}</h4>
                                <p class="albumComment">${comment.comment}</p>
                                
                            </section> 
                        </div>`
                    }).join("")
                }
            </article>
    </main>`;
    }