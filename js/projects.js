const lastUpdated = new Date(document.lastModified);
const options = {
	year: 'numeric', month: 'long', day: 'numeric',
	hour: '2-digit', minute: '2-digit', second: '2-digit'
};
document.getElementById("last-updated").innerHTML = "This site was last updated on " + lastUpdated.toLocaleString(undefined, options) + ".";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const title = document.querySelector(".title");
const caption = document.getElementById("caption");
const index = document.getElementById("index");
const images = document.querySelectorAll(".gallery img, #dev-screenshot");
const closeBtn = document.getElementsByClassName("close")[0];
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

let currentImg = null;

function highlightActive(img) {
	images.forEach(i => i.classList.remove("active-image"));
	img.classList.add("active-image");
}

function showImage(img) {
	modalImg.src = img.src;
	const i = Array.from(images).indexOf(img);
	index.innerHTML = `${i + 1} of ${images.length}`;
	title.textContent = img.getAttribute("data-title") || "Media";
	caption.innerHTML = img.alt + "<br><b>Click</b> on the image to expand it in a new tab.";
	currentImg = img;
	highlightActive(img);
}

images.forEach((img) => {
	img.addEventListener("click", () => {
		modal.style.display = "block";
		showImage(img);
	});
});

modalImg.addEventListener("click", (e) => {
	e.stopPropagation();
	if (currentImg) {
		window.open(currentImg.src, "_blank");
	}
});

backBtn.addEventListener("click", () => {
	if (!currentImg) return;
	let i = Array.from(images).indexOf(currentImg);
	i = (i - 1 + images.length) % images.length;
	showImage(images[i]);
});

nextBtn.addEventListener("click", () => {
	if (!currentImg) return;
	let i = Array.from(images).indexOf(currentImg);
	i = (i + 1) % images.length;
	showImage(images[i]);
});

closeBtn.onclick = () => {
	modal.style.display = "none";
	currentImg = null;
	images.forEach(i => i.classList.remove("active-image"));
};

window.onclick = (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
		currentImg = null;
		images.forEach(i => i.classList.remove("active-image"));
	}
};

window.addEventListener("keydown", (e) => {
	if (!currentImg) return;
	if (e.key === "ArrowLeft") {
		backBtn.click();
	} else if (e.key === "ArrowRight") {
		nextBtn.click();
	} else if (e.key === "Escape") {
		closeBtn.click();
	}
});

