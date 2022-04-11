const API_KEY = 'solaris-NKsTcw3OPrMQPoSz';

let search = document.getElementById("searchbar");
let searchBtn = document.getElementById("searchBtn");

let displayBox = document.getElementById("display-box");

// https://fathomless-shelf-54969.herokuapp.com/bodies

async function getData() {
    try {
        let resp = await fetch('https://fathomless-shelf-54969.herokuapp.com/bodies', {
            method: 'GET',
            headers: {
                'x-zocom': API_KEY
            }
        })
        data = await resp.json();
        // console.log(data);
        return data;
        // data.bodies[x].x 
    } catch (err) {
        console.log(err);




        let errBox = document.createElement("div");
        errBox.classList.add("error-box");


        let errorHeader = document.createElement("h2");
        errorHeader.innerHTML = "Oops!";
        errBox.appendChild(errorHeader);

        let errorInfo = document.createElement("p");
        errorInfo.innerHTML = "Något gick fel med satellitnätverket, vänligen prova igen senare.";
        errBox.appendChild(errorInfo);

        let errorReason = document.createElement("p");
        errorReason.classList.add("error-reason");
        errorReason.innerHTML = `"${err.toString()}"`;
        errBox.appendChild(errorReason);

        displayBox.appendChild(errBox);


    }
}


//displayar standardvisningen för planeterna
async function displayDefaultUI() {
    let data = await getData();
    let bodies = data.bodies;
    console.log(bodies)

    for (i = 0; i < bodies.length; i++) {
        updateUI(bodies[i]);
    }


}



function updateUI(body) {

    let planet = document.createElement("article");
    planet.classList.add("planet");

    let img = document.createElement("img");
    img.setAttribute("src", `img/${body.name}.png`);

    let title = document.createElement("h3");
    title.innerHTML = body.name;

    let latinTitle = document.createElement("p");
    latinTitle.innerHTML = body.latinName;


    planet.appendChild(img);
    planet.appendChild(title);
    planet.appendChild(latinTitle);
    displayBox.appendChild(planet);

    planet.addEventListener("click", function () {
        let overlay = document.querySelector('.overlay');
        overlay.style.display = 'block';

        //nytt bildelement annars försvinner originalet
        let image = document.createElement("img");
        image.setAttribute('src', `img/${body.name}.png`);

        let overlayContent = document.querySelector('.overlay-content');
        overlayContent.appendChild(image);

        let bodyInfo = document.createElement("div");
        bodyInfo.classList.add("body-info");

        let modName = document.createElement("h4");
        modName.classList.add("mod-name");
        modName.innerHTML = body.name;
        bodyInfo.appendChild(modName);


        let modTemp = document.createElement("P");
        modTemp.classList.add("mod-temp");
        modTemp.innerHTML = `Temperatur: <br> Max: <b>${body.temp.day}</b>. | Min: <b>${body.temp.night}</b>.`;
        bodyInfo.appendChild(modTemp);
        console.log(body.temp)

        let moreInfo = document.createElement("button");
        moreInfo.classList.add("more-info");
        moreInfo.innerHTML = "Mer info";
        bodyInfo.appendChild(moreInfo);



        overlayContent.appendChild(bodyInfo);
        overlay.addEventListener("click", clearModal)

        moreInfo.addEventListener("click", goToBodyPage(body));



    })

}

function clearModal() {
    let overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    let overlayContent = document.querySelector('.overlay-content');
    overlayContent.innerHTML = '';
}


async function searchBodies() {

    let data = await getData();
    let bodies = data.bodies;

    // let option = document.getElementById("selectbar").value;

    displayBox.innerHTML = "";
    if (search.value == "") {
        displayDefaultUI();
    }

    for (i = 0; i < bodies.length; i++) {
        if (search.value != "" && bodies[i].name.toLowerCase().includes(search.value.toLowerCase())) {
            updateUI(bodies[i]);
        }
    }

}

function goToBodyPage(body) {

    return function () {


        window.localStorage.setItem('body', JSON.stringify(body));
        window.location.href = "bodypage.html";


    }

}


displayDefaultUI();
search.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
})
searchBtn.addEventListener("click", searchBodies);