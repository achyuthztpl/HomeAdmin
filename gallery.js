let galleryObject;

$(function() {
    if (!galleryObject && !localStorage.getItem("gallery")) {
        $.getJSON("./data.json", function(data) {
            //console.log(data);

            galleryObject = data;
            galleryObject = galleryObject && galleryObject.gallery ? galleryObject.gallery : null;
            //console.log(galleryObject)
            localStorage.setItem("gallery", JSON.stringify(data));
            //console.log(localStorage.getItem("gallery"))

            readGallery();
        });
    } else {
        galleryObject = JSON.parse(localStorage.getItem("gallery"));
        galleryObject = galleryObject && galleryObject.gallery ? galleryObject.gallery : null;
        readGallery();
    }

});

function getDivWithClass(className) {
    let div = document.createElement("div");
    div.className = className;
    return div;
}

function readGallery() {
    const gallery_holder = document.getElementById("images_placeholder");
    if (!galleryObject || galleryObject.length == 0) {
        gallery_holder.innerHTML = `<h5 class="no-images">No Images in Gallery</h5>`;
        return;
    }

    //let innerHTML = '<div class="row">';
    let innerObj = getDivWithClass("row");
    galleryObject.forEach(element => {
        let colChild = getDivWithClass("col-md-4");
        let cardObj = getDivWithClass("card");
        cardObj.id = element.id;
        let imgObj = document.createElement("img");
        imgObj.src = element.url;
        imgObj.className = "card-img-top";
        imgObj.alt = element.name;
        cardObj.appendChild(imgObj);
        let cardBodyObj = getDivWithClass("card-body");
        let cardBodyTextObj = document.createElement("p");
        cardBodyTextObj.className = "card-text";
        cardBodyTextObj.textContent = element.information;
        cardBodyObj.appendChild(cardBodyTextObj);
        cardObj.appendChild(cardBodyObj);
        colChild.appendChild(cardObj);
        innerObj.appendChild(colChild);
        /* innerHTML += `<div class="col-md-4">
        <div class="card" id="${element.id}">
            <img src="${element.url}" class="card-img-top" alt="${element.name}">
            <div class="card-body">
                <p class="card-text">${element.information}
                </p>
            </div>
        </div>
    </div>`; */
    });
    //innerHTML += '</div>';

    //gallery_holder.innerHTML = innerHTML;
    gallery_holder.appendChild(innerObj);
}