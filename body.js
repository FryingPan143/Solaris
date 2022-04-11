let body = window.localStorage.getItem('body');
body = JSON.parse(body);

console.log(body);

// const API_KEY = 'solaris-NKsTcw3OPrMQPoSz';
// async function getData() {
//     try {
//         let resp = await fetch('https://fathomless-shelf-54969.herokuapp.com/bodies', {
//             method: 'GET',
//             headers: {
//                 'x-zocom': API_KEY
//             }
//         })
//         data = await resp.json();
//         console.log(data);
//         return data;
//         // data.bodies[x].x 
//     } catch (err) {
//         console.error(err);
//     }
// }
// getData();



function displayBody() {

    let planetChart = document.getElementById("planet-chart");

    let bp_planet = document.createElement("article");
    bp_planet.classList.add("bp-planet");

    let bp_img = document.createElement("img");
    bp_img.setAttribute("src", `img/${body.name}.png`);

    let bp_bodyInfo = document.createElement("article");
    bp_bodyInfo.classList.add("bp-body-info");



    let bp_bodyName = document.createElement("h2");
    bp_bodyName.classList.add("bp-name");
    bp_bodyName.innerHTML = body.name;
    bp_bodyInfo.appendChild(bp_bodyName);

    let bp_latinName = document.createElement("p");
    bp_latinName.innerHTML = `<i>${body.latinName}</i>`;
    bp_latinName.classList.add("bp-latin-name");
    bp_bodyInfo.appendChild(bp_latinName);

    let bp_desc = document.createElement("p");
    bp_desc.classList.add("bp-desc");
    bp_desc.innerHTML = body.desc;
    bp_bodyInfo.appendChild(bp_desc);

    //om en eller fler Månar finns, skapa då bp_moons.
    if (body.moons.length >= 1) {
        let bp_moons = document.createElement("p");
        bp_moons.classList.add("bp-moons");
        bp_moons.innerHTML = "<b>Måne:</b><br>";

        let paginationMenu = document.createElement("div");
        paginationMenu.classList.add("pagination-menu");


        let pageNo = 0;
        let maxAmountOfMoonsPerPage = 5;


        if (body.moons.length > 1) {
            bp_moons.innerHTML = "<b>Månar:</b><br>";
        }


        let moonWrap = document.createElement("div");
        bp_moons.appendChild(moonWrap);


        redrawMoons();

        for (i = 0; i < Math.ceil(body.moons.length / maxAmountOfMoonsPerPage); i++) {

            let pageBtn = document.createElement("button");
            pageBtn.innerHTML = i + 1;
            paginationMenu.appendChild(pageBtn);

            pageBtn.addEventListener("click", moonPage(i))

        }

        function moonPage(pageNum) {

            return () => {
                pageNo = pageNum;
                redrawMoons();
            }
        }


        function redrawMoons() {
            moonWrap.innerHTML = "";
            for (i = pageNo * maxAmountOfMoonsPerPage; i < (pageNo * maxAmountOfMoonsPerPage) + maxAmountOfMoonsPerPage && i < body.moons.length; i++) {
                moonWrap.innerHTML += body.moons[i] + "<br>";
            }
        }

        // for (i = pageNo - 1; i < pageNo + max_moon_pp && i < body.moons.length; i++) {
        //     bp_moons.innerHTML += body.moons[i] + " ";

        // }
        /////////////
        // for (i = 0; i < body.moons.length; i++) {
        //     bp_moons.innerHTML += body.moons[i] + " ";

        // }

        bp_moons.appendChild(paginationMenu);
        bp_bodyInfo.appendChild(bp_moons);
    }

    let bp_temp = document.createElement("p");
    bp_temp.classList.add("bp-temp");
    bp_temp.innerHTML = `<b>Temperatur:</b><br><b>Max:</b> ${body.temp.day}&#8451;<br><b>Min:</b> ${body.temp.night}&#8451;`;
    bp_bodyInfo.appendChild(bp_temp);

    let bp_circumference = document.createElement("p");
    bp_circumference.classList.add("bp-circumference");
    bp_circumference.innerHTML = `<b>Omkrets:</b><br> ${Math.ceil(body.circumference / 10)} mil.`;
    bp_bodyInfo.appendChild(bp_circumference);

    //för att jag skall kunna filtrera bort distans och omloppsperiod när månar ej finns
    //behöver jag deklarera variablerna men enbart tilldela värde när det ej är solen som behandlas i bodyn. 
    //annars blir det error på if-satsen nedan då variabler saknas. 
    let bp_orbit = document.createElement("p"); // därför läggs orbit
    let bp_distance = document.createElement("p"); //och distance här, innan denna if-sats.
    bp_orbit.classList.add("bp-orbit");
    if (body.name != "Solen") {
        bp_orbit.innerHTML = `<b>Omloppsperiod:</b> ${body.orbitalPeriod} dagar.`;
        bp_bodyInfo.appendChild(bp_orbit);

        bp_distance.classList.add("bp-distance");
        bp_distance.innerHTML = `<b>Avstånd från Solen:</b> ${body.distance / 10} mil.`;
        bp_bodyInfo.appendChild(bp_distance);
    }

    bp_planet.appendChild(bp_img);
    planetChart.appendChild(bp_planet);
    planetChart.appendChild(bp_bodyInfo);

    //flyttar övriga element till kanten om det saknas Måne/ar.
    if (body.moons.length < 1) {

        bp_temp.style.gridColumn = "1 / 1";
        bp_orbit.style.gridColumn = "1 / 1";
        bp_distance.style.gridColumn = "2 / 2";
        bp_circumference.style.gridColumn = "2 / 2";

    }
    if (body.name == "Solen") {
        bp_circumference.style.gridColumn = "1 / 1";
    }



    //byter bakgrundsbild beroende på val av planet
    let main = document.querySelector("main");
    switch (body.name) {
        case body.name:
            main.style.background = `url(img/${body.name.toLowerCase()}bg.jpg)`;
            main.style.backgroundSize = "cover";

            break;
    }
}

displayBody();