const lastUpdated = new Date(document.lastModified);
const options = {
	year: 'numeric', month: 'long', day: 'numeric',
	hour: '2-digit', minute: '2-digit', second: '2-digit'
};
document.getElementById("last-updated").innerHTML = "This site was last updated on " + lastUpdated.toLocaleString(undefined, options) + ".";

function toggleTOC() {
	const panel = document.getElementById('toc-panel');
	const arrow = document.getElementById('toc-arrow');
	panel.classList.toggle('hidden');
	arrow.classList.toggle('rotated');
}

toggleTOC();

const sections = document.querySelectorAll('h1, h2');
const tocLinks = document.querySelectorAll('.toc a');

window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 100;
		if (scrollY >= sectionTop) {
			current = section.getAttribute('id');
		}
	});

	tocLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + current) {
			link.classList.add('active');
		}
	});
});

