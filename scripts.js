//tallennetaan linkki variablen sisään
var link1 = "https://www.finnkino.fi/xml/Schedule/";

//tehdään functio jolla tulostetaan data
function tulosta(data) {
    data = data.responseXML.getElementsByTagName("Show");
    Array.from(data).forEach(show => {
        luoData(show)
    });
}
//enterillä painettaessa, toteuttaa haku function ja etsii elokuvan hakusanalla
document.getElementById("hakusana").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            haku(this, document.getElementById("hakusana").value)
        }
        xhttp.open("GET", link1);
        xhttp.send();
    }
})
//tällä etsitään elokuvan nimellä, jos hakusanalle löytyy vastine tulostaa tämän
function haku(data, value) {
    document.getElementById("main").innerHTML = "";
    data = data.responseXML.getElementsByTagName("Show");
    Array.from(data).forEach(show => {
        var title = show.getElementsByTagName("Title")[0].innerHTML;
        title = title.toLowerCase();
        if (title.includes(value.toLowerCase()) ){
            luoData(show)
        }
    });
}
//kaikki tiedot mitöä tulostetaan
function luoData(show) {
    var disp = document.getElementById("main");
    var title = show.getElementsByTagName("Title")[0].innerHTML;
    var image = show.getElementsByTagName("Images")[0].childNodes[3].innerHTML;
    var place = show.getElementsByTagName("TheatreAndAuditorium")[0].innerHTML;
    var showStart = muokkaaAika(show.getElementsByTagName("dttmShowStart")[0].innerHTML);
    var saleEnd = muokkaaAika(show.getElementsByTagName("ShowSalesEndTime")[0].innerHTML);
    var rating = show.getElementsByTagName("Rating")[0].innerHTML;
    var genre = show.getElementsByTagName("Genres")[0].innerHTML;
    var div1 = document.createElement("div");
    div1.classList.add("elokuva");
    div1.innerHTML = '<img src="' +
        image + '"><div class="elokuva"><h3>' +
        title + '</h3><span>' +
        rating + '<br>Genret: '+ genre +'</span></div><div class="overview">Paikka ja sali: ' +
        place + '<br>Lipunmyynti loppuu: ' +
        saleEnd + '<br>Naytos alkaa: ' +
        showStart + '</div>';
    disp.appendChild(div1);
}
//muovataan ajan muoto
function muokkaaAika(time) {
    var time = time.split("T");
    time = time[1].split(":");
    time = time[0] + ":" + time[1];
    return time
}
