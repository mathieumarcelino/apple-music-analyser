let music = []; //liste toute musique [0]=artiste [1]=morceau

let music_ecoute = []; //liste 1 fois toute les musiques écoutés
let music_test = []; //ajoute si déja écouté

let artist_ecoute = [];
let artist_test = [];

let date_ecoute = [];
let date_test = [];

let device_ecoute = [];
let device_test = [
  ["iPhone", 0],
  ["Mac", 0],
  ["HomePod", 0],
  ["AppleTV", 0],
  ["Windows", 0],
  ["other", 0]
];

let music_ecoute_count = 0;
let artist_ecoute_count = 0;
let date_ecoute_count = 0;

let device_test_count = 0;

let music_time_count = 0;
let music_total_ecoute_count = 0;

let month = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

$(".box").hide();

$("#viewfile").click(function() {
  let rdr = new FileReader();

  rdr.onload = function(e) {
    let therows = e.target.result.split("\n");

    createTable();

    createMusicEcoute();
    createArtistEcoute();
    createDateEcoute();
    createDeviceEcoute();

    TriMusicEcoute();
    TriArtistEcoute();
    TriDateEcoute();
    TriDeviceEcoute();

    ShowMusicEcoute();
    ShowArtistEcoute();
    ShowDateEcoute();
    ShowDeviceEcoute();

    ShowYourStats();

    end();

    //Créer le tableau jQuery
    function createTable() {
      for (let i = 1; i < therows.length; i++) {
        let columns = therows[i].split('","');
        if (
          columns[2] != "" &&
          columns[5] != "" &&
          columns[9] > 30000 &&
          columns[10] != "" &&
          columns[11] != "" &&
          columns[3] != ""
        ) {
          let j = music.length;
          music[j] = [
            columns[2],
            columns[5],
            +columns[9],
            columns[10],
            columns[11],
            columns[3]
          ];
          music_time_count = music[j][2] + music_time_count;
        } else {
        }
      }
      console.log(music);
    }

    // Créer tableau music_ecoute avec tous les titres et nombres d'écoutes
    function createMusicEcoute() {
      for (let k = 0; k < music.length; k++) {
        if (
          $.inArray("" + music[k][0] + " - " + music[k][1] + "", music_test) ==
          -1
        ) {
          let nbEcouteMusic = 1;
          music_ecoute[music_ecoute_count] = [
            music_ecoute_count,
            music[k][0],
            music[k][1],
            nbEcouteMusic
          ];
          music_test.push("" + music[k][0] + " - " + music[k][1] + "");
          music_ecoute_count++;
          music_total_ecoute_count++;
        } else {
          let placeInArray = music_test.indexOf(
            "" + music[k][0] + " - " + music[k][1] + ""
          );
          let nbEcouteMusic = music_ecoute[placeInArray][3];
          nbEcouteMusic++;
          music_ecoute[placeInArray][3] = nbEcouteMusic;
          music_total_ecoute_count++;
        }
      }
    }

    // Créer tableau artist_ecoute avec tous les artistes et nombres d'écoutes
    function createArtistEcoute() {
      for (let k = 0; k < music.length; k++) {
        if ($.inArray("" + music[k][0] + "", artist_test) == -1) {
          let nbEcouteArtist = 1;
          artist_ecoute[artist_ecoute_count] = [
            artist_ecoute_count,
            music[k][0],
            nbEcouteArtist
          ];
          artist_test.push("" + music[k][0] + "");
          artist_ecoute_count++;
        } else {
          let placeInArray = artist_test.indexOf("" + music[k][0] + "");
          let nbEcouteArtist = artist_ecoute[placeInArray][2];
          nbEcouteArtist++;
          artist_ecoute[placeInArray][2] = nbEcouteArtist;
        }
      }
    }

    // Créer tableau date_ecoute avec tous les dates et nombres d'écoutes
    function createDateEcoute() {
      for (let k = 0; k < music.length; k++) {
        let date_courte = music[k][4].substr(0, 10);

        if ($.inArray(date_courte, date_test) == -1) {
          let nbEcouteDate = 1;
          let timeEcouteDate = music[k][2];
          date_ecoute[date_ecoute_count] = [
            date_ecoute_count,
            date_courte,
            nbEcouteDate,
            timeEcouteDate
          ];
          date_test.push(date_courte);
          date_ecoute_count++;
        } else {
          let placeInArray = date_test.indexOf(date_courte);
          let nbEcouteDate = date_ecoute[placeInArray][2];
          nbEcouteDate++;
          date_ecoute[placeInArray][2] = nbEcouteDate;
          let timeEcouteDate = date_ecoute[placeInArray][3];
          timeEcouteDate = date_ecoute[placeInArray][3] + music[k][2];
          date_ecoute[placeInArray][3] = timeEcouteDate;
        }
      }
    }

    // Créer tableau device_ecoute avec tous les titres et nombres d'écoutes
    function createDeviceEcoute() {
      for (let k = 0; k < music.length; k++) {
        if (music[k][5].includes("iPhone") === true) {
          device_test[0][1] = device_test[0][1] + 1;
        } else if (music[k][5].includes("MacBook") === true) {
          device_test[1][1] = device_test[1][1] + 1;
        } else if (music[k][5].includes("AudioAccessory") === true) {
          device_test[2][1] = device_test[2][1] + 1;
        } else if (music[k][5].includes("AppleTV") === true) {
          device_test[3][1] = device_test[3][1] + 1;
        } else if (music[k][5].includes("Windows") === true) {
          device_test[4][1] = device_test[4][1] + 1;
        } else {
          device_test[5][1] = device_test[5][1] + 1;
        }
      }

      for (let k = 0; k < device_test.length; k++) {
        if (device_test[k][1] != 0) {
          device_ecoute.push(device_test[k]);
        } else {
        }
      }
    }

    // Tri tableau music_ecoute par nombre d'écoute
    function TriMusicEcoute() {
      music_ecoute.sort(function(a, b) {
        return b[3] - a[3];
      });

      for (let k = 0; k < music_ecoute.length; k++) {
        let placeInArray = music_ecoute.indexOf(music_ecoute[k]);
        music_ecoute[k][4] = placeInArray + 1;
      }
    }

    // Tri tableau artist_ecoute par nombre d'écoute
    function TriArtistEcoute() {
      artist_ecoute.sort(function(a, b) {
        return b[2] - a[2];
      });

      for (let k = 0; k < artist_ecoute.length; k++) {
        let placeInArray = artist_ecoute.indexOf(artist_ecoute[k]);
        artist_ecoute[k][3] = placeInArray + 1;
      }
    }

    // Tri tableau date_ecoute par nombre d'écoute
    function TriDateEcoute() {
      date_ecoute.sort(function(a, b) {
        return b[3] - a[3];
      });

      for (let k = 0; k < date_ecoute.length; k++) {
        let placeInArray = date_ecoute.indexOf(date_ecoute[k]);
        date_ecoute[k][4] = placeInArray + 1;
      }
    }

    // Tri tableau device_ecoute par nombre d'écoute
    function TriDeviceEcoute() {
      device_ecoute.sort(function(a, b) {
        return b[1] - a[1];
      });

      for (let k = 0; k < device_ecoute.length; k++) {
        let placeInArray = device_ecoute.indexOf(device_ecoute[k]);
        device_ecoute[k][2] = placeInArray + 1;
      }
      console.log(device_ecoute);
    }

    // Affiche tableau music_ecoute dans songs-stats
    function ShowMusicEcoute() {
      $("#top-songs-stats").html(
        '<p class="text-right-bottom-box">' +
          music_ecoute.length.toLocaleString() +
          ' songs</p><p class="text-right-bottom-box">' +
          music_total_ecoute_count.toLocaleString() +
          " plays</p>"
      );

      for (let l = 0; l < music_ecoute.length; l++) {
        $("#songs-stats").append(
          '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
            music_ecoute[l][4] +
            '</span></div><div class="subitem1-box"><span class="text1-item-box">' +
            music_ecoute[l][2] +
            '</span><span class="text1-item-box grey">' +
            music_ecoute[l][1] +
            '</span></div><div class="subitem-box"><span class="text-item-box">' +
            music_ecoute[l][3] +
            "</span></div></div>"
        );
      }
    }

    // Affiche tableau artist_ecoute dans artists-stats
    function ShowArtistEcoute() {
      $("#top-artists-stats").html(
        '<p class="text-right-bottom-box">' +
          artist_ecoute.length.toLocaleString() +
          ' artists</p><p class="text-right-bottom-box">' +
          music_total_ecoute_count.toLocaleString() +
          " plays</p>"
      );

      for (let l = 0; l < artist_ecoute.length; l++) {
        $("#artists-stats").append(
          '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
            artist_ecoute[l][3] +
            '</span></div><div class="subitem1-box"><span class="text1-item-box">' +
            artist_ecoute[l][1] +
            '</span></div><div class="subitem-box"><span class="text-item-box">' +
            artist_ecoute[l][2] +
            "</span></div></div>"
        );
      }
    }

    // Affiche tableau date_ecoute dans date-stats
    function ShowDateEcoute() {
      $("#top-date-stats").html(
        '<p class="text-right-bottom-box">' +
          date_ecoute.length.toLocaleString() +
          ' days</p><p class="text-right-bottom-box">' +
          music_total_ecoute_count.toLocaleString() +
          " plays</p>"
      );

      for (let l = 0; l < date_ecoute.length; l++) {
        let year = date_ecoute[l][1].substr(0, 4);
        let day = date_ecoute[l][1].substr(8, 2);
        let hours = Math.trunc(date_ecoute[l][3] / 3600000);
        let minutes = Math.trunc((date_ecoute[l][3] - hours * 3600000) / 60000);
        let secondes = Math.trunc(
          (date_ecoute[l][3] - (hours * 3600000 + minutes * 60000)) / 1000
        );
        if (hours === 0 && minutes === 0) {
          $("#date-stats").append(
            '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
              date_ecoute[l][4] +
              '</span></div><div class="subitem2-box"><span class="text1-item-box">' +
              day * 1 +
              " " +
              month[date_ecoute[l][1].substr(5, 2) * 1] +
              " " +
              year +
              '</span></div><div class="subitem3-box"><span class="text-item-box">' +
              secondes +
              "s</span></div></div>"
          );
        } else if (hours === 0) {
          $("#date-stats").append(
            '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
              date_ecoute[l][4] +
              '</span></div><div class="subitem2-box"><span class="text1-item-box">' +
              day * 1 +
              " " +
              month[date_ecoute[l][1].substr(5, 2) * 1] +
              " " +
              year +
              '</span></div><div class="subitem3-box"><span class="text-item-box">' +
              minutes +
              "m " +
              secondes +
              "s</span></div></div>"
          );
        } else {
          $("#date-stats").append(
            '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
              date_ecoute[l][4] +
              '</span></div><div class="subitem2-box"><span class="text1-item-box">' +
              day * 1 +
              " " +
              month[date_ecoute[l][1].substr(5, 2) * 1] +
              " " +
              year +
              '</span></div><div class="subitem3-box"><span class="text-item-box">' +
              hours +
              "h " +
              minutes +
              "m " +
              secondes +
              "s</span></div></div>"
          );
        }
      }
    }

    // Affiche tableau device_ecoute dans devices-stats
    function ShowDeviceEcoute() {
      $("#top-devices-stats").html(
        '<p class="text-right-bottom-box">' +
          device_ecoute.length.toLocaleString() +
          ' devices</p><p class="text-right-bottom-box">' +
          music_total_ecoute_count.toLocaleString() +
          " plays</p>"
      );

      for (let l = 0; l < device_ecoute.length; l++) {
        $("#devices-stats").append(
          '<div class="item-box"><div class="subitem-box"><span class="text-item-box red">' +
            device_ecoute[l][2] +
            '</span></div><div class="subitem1-box"><span class="text1-item-box">' +
            device_ecoute[l][0] +
            '</span></div><div class="subitem-box"><span class="text-item-box">' +
            device_ecoute[l][1] +
            "</span></div></div>"
        );
      }
    }

    // Affiche Your Stats
    function ShowYourStats() {
      let days = Math.trunc(music_time_count / 86400000);
      let hours = Math.trunc((music_time_count - days * 86400000) / 3600000);
      let minutes = Math.trunc(
        (music_time_count - (days * 86400000 + hours * 3600000)) / 60000
      );
      let secondes = Math.trunc(
        (music_time_count -
          (days * 86400000 + hours * 3600000 + minutes * 60000)) /
          1000
      );

      let time_ecoute_per_day = music_time_count / date_ecoute.length;
      let hours1 = Math.trunc(time_ecoute_per_day / 3600000);
      let minutes1 = Math.trunc(
        (time_ecoute_per_day - hours1 * 3600000) / 60000
      );
      let secondes1 = Math.trunc(
        (time_ecoute_per_day - (hours1 * 3600000 + minutes1 * 60000)) / 1000
      );

      $("#time-ecoute").html(
        "" + days + "d " + hours + "h " + minutes + "m " + secondes + "s"
      );
      $("#nombre-musics").html(music_ecoute.length.toLocaleString());
      $("#nombre-artists").html(artist_ecoute.length.toLocaleString());
      $("#time-ecoute-day").html(
        "" + hours1 + "h " + minutes1 + "m " + secondes1 + "s"
      );
    }

    function end() {
      $("#home").hide();
      $(".box").show();
    }
  };

  rdr.readAsText($("#inputfile")[0].files[0]);
});
