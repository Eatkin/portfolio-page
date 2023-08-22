document.addEventListener("DOMContentLoaded", function () {
    const projectOverlays = document.querySelectorAll(".project-overlay");
    const detailsOverlays = document.querySelectorAll(".project-details-overlay");
    const closeOverlayButtons = document.querySelectorAll(".close-button");
    const projectTitles = document.querySelectorAll(".project-title-hidden");

    function openDetailsOverlay(index) {
        detailsOverlays[index].classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDetailsOverlay(index) {
        detailsOverlays[index].classList.add("closing");
        document.body.style.overflow = "auto";

        setTimeout(function () {
            detailsOverlays[index].classList.remove("closing");
            detailsOverlays[index].classList.add("inactive");
            detailsOverlays[index].classList.remove("active");
        }, 300);

        setTimeout(function () {
            detailsOverlays[index].classList.remove("inactive");
        }, 600);
    }

    projectOverlays.forEach(function (overlay, index) {
        overlay.addEventListener("click", function () {
            openDetailsOverlay(index);
        });
    });

    // Add listeners for the titles too (for responsiveness)
    projectTitles.forEach(function (title, index) {
        title.addEventListener("click", function () {
            openDetailsOverlay(index);
        });
    });

    detailsOverlays.forEach(function (detailsOverlay, index) {
        detailsOverlay.addEventListener("click", function (event) {
            // Check if the click target is the overlay itself, not its content
            if (event.target === detailsOverlay) {
                closeDetailsOverlay(index);
            }
        });

        // Prevent clicks inside the content from closing the overlay
        detailsOverlay.querySelector(".project-content").addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Add listeners for the buttons too (for responsiveness)
    closeOverlayButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            closeDetailsOverlay(index);
        });
    });
});