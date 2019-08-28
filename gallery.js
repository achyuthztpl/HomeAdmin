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

function readGallery() {
    const gallery_holder = document.getElementById("images_placeholder");
    if (!galleryObject || galleryObject.length == 0) {
        gallery_holder.innerHTML = `<h5 class="no-images">No Images in Gallery</h5>`;
        return;
    }

    let innerHTML = '<div class="row">';
    galleryObject.forEach(element => {
        innerHTML += `<div class="col-md-4">
        <div class="card" id="${element.id}">
            <img src="${element.url}" class="card-img-top" alt="${element.name}">
            <div class="card-body">
                <p class="card-text">${element.information}
                </p>
            </div>
        </div>
    </div>`;
    });
    innerHTML += '</div>';

    gallery_holder.innerHTML = innerHTML;
}