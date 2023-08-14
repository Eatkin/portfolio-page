document.addEventListener("DOMContentLoaded", function () {
    const projectOverlays = document.querySelectorAll(".project-overlay");
    const detailsOverlays = document.querySelectorAll(".project-details-overlay");

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
});





/* OLD ACCORDION STYLE DISPLAY CODE */

// document.addEventListener("DOMContentLoaded", function () {
//     const projectImages = document.querySelectorAll(".project-image");

//     projectImages.forEach(function (image) {
//         image.addEventListener("click", function () {
//             // Prevent the default click behavior
//             event.preventDefault();

//             const project = this.closest(".project");
//             const projectContent = project.querySelector(".project-content");

//             const scrollOffset = -10;

//             // First find if our project is open, if it is we scroll to the top of the .project div and close it
//             if (projectContent.style.maxHeight !== "") {
//                 projectContent.style.maxHeight = "";
//                 window.scrollTo({
//                     top: project.offsetTop + scrollOffset,
//                     behavior: "smooth"
//                 });
//                 // Don't need to do anything else, we're done here
//                 return;
//             }

//             // If we're trying to open a project that isn't already open, we need to close all other open projects
//             // If we're above all open projects, we don't need to adjust the viewport
//             // If we're below all open projects, we need to adjust the viewport by the height of the open projects
//             const projects = document.querySelectorAll(".project");

//             for (let _project of projects) {
//                 // If it doesn't have a .project-content element, skip it because I just haven't added one yet
//                 if (!_project.querySelector(".project-content")) {
//                     continue;
//                 }

//                 // If this isn't the project we're opening, collapse it
//                 if (_project !== project && _project.querySelector(".project-content").style.maxHeight !== "") {
//                     // Save the transition
//                     let transition = _project.querySelector(".project-content").style.transition;
//                     // Set the transition to none
//                     _project.querySelector(".project-content").style.transition = "none";
//                     // Collapse the project
//                     _project.querySelector(".project-content").style.maxHeight = "";
//                     // Then restore the transition with a timeout
//                     setTimeout(function () {
//                         _project.querySelector(".project-content").style.transition = transition;
//                     }, 10);
//                 }
//             }



//             // Open the clicked project
//             projectContent.style.maxHeight = projectContent.scrollHeight + "px";

//             window.scrollTo({
//                 top: project.offsetTop + scrollOffset,
//                 behavior: "smooth"
//             });
//         });
//     });
// });