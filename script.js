
window.onscroll = function() {
    let button = document.getElementById("scrollTop");
    if (document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

// Scroll back to top when button is clicked
document.getElementById("scrollTop").onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
