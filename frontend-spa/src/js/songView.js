export default function songView(song,album){
    return`
    <main class="main">
        <h2 class="songTitleHeader">Song:<br></h2>
        <h2 class="songTitle">${song.title}</h2>
        <img class="backBtn" src="./images/backBtn.png" alt="back button" />
        <div class=songInfoAndComments">
            <div class="singleSong">
                <article class="flip-card">
                    <section class="inner">
                        <div class="card-front song-front">
                            <img src="${album.imageUrl}" alt="Avatar" style="width:375px;height:375px;" />
                        </div>
                        <section class="card-back songInfo">
                            <h1 class="artist">Artist:<br> ${song.artist}</h1>
                            <p class="avgRatingSong">Song Rating: ${song.averageSongRating}</p>
                            <a class="songLink" href="${song.link}">Click here to Listen</a>
                            <p class="duration">Duration: ${song.duration}</p>
                            <input type="hidden" class="id_field" value="${song.id}" />
                        </section>
                    </section>
                </article>
            </div>

            <article class="songComments">
                ${
                    song.comments.map(comment => {
                    return`
                    <div class="displayReview">
                        <img class="profileImg" src="./images/profile.png" alt="profile icon">
                        <section class="commentDisplay">
                            <h3 class="name">${comment.author}</h3>
                            <h4 class="rating">${comment.rating}</h4>
                            <p class="comment">${comment.comment}</p>
                        </section> 
                    </div>`
                    }).join("")
                }
                <div class="reviewInput">
                    <p class="requiredCommentsSong">*All fields are required*</p>
                    <label for="fullName">Full Name:</label><br>
                    <input id="nameInput" type="text" name="fullName" placeholder="John Doe" /><br>
                    <label for="rating">Rate The Song:</label><br>
                    <input id="ratingInput" type="number"name="rating" placeholder="5"/><br>
                    <label for="comment">Comment:</label><br>
                    <input id="commentInput" type="text" name="comment" placeholder="Best song!" /><br>
                    <button class ="songReviewSubmitBtn">Submit </button>
                </div>
            </atricle>
        </div>

    </main>`;
}