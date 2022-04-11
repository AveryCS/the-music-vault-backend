export default function header(){
   return  `
   
   <header class="header">
    <nav class="nav">
        <a id="aboutUs" class="nav-links aboutUs">About the Creators</a>
        <a class="nav-links" href="https://wecancodeit.org/about-us/" target="_blank">About WCCI</a>
    </nav>

    <div id="aboutUsModal" class="aboutusmodal">
        <div class="aboutusmodal-content">
            <span class="closeModal">&times;</span>
            <div class="aboutuscontent">
                <h1 class="aboutUs">Hari, Avery, and Mike are currently students at We Can Code IT- an intensive 14 week software development bootcamp for fullstack Java developers.</h1>
                <h2 class="linkInfo"> Click to view their LinkedIn profiles below </h2>
                <article class="photos">
                    <section class="hari names">
                        <a class="headshots" href="https://www.linkedin.com/in/hari-adhikari-77935116b/" target="_blank"> 
                        <img class="profile" alt="Haris Headshot" src="./images/hari.jpg" /></a>
                        <p class="personName">Hari Adhikari</p>
                    </section>
                    <section class="avery names">
                        <a class="headshots" href="https://www.linkedin.com/in/averycs/" target="_blank"> 
                        <img class="profile"
                        alt="Averys Headshot " src="./images/avery.jpg" /></a>
                        <p class="personName">Avery Smith</p>
                    </section>
                    <section class="mike names">
                        <a class="headshots" href="https://www.linkedin.com/in/mikethecoder/" target="_blank">
                         <img class="profile" alt="Mikes Headshot" src="./images/mike.jpg" />
                         </a>
                        <p class="personName" >Mike Liddy</p>
                    </section>
                </article>
            </div>
        </div>
     </div>
</header>`;
}