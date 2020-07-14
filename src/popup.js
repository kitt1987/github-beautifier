window.onload = () => {
	document.getElementById("repo").addEventListener('click', (event) => {
		chrome.tabs.create({ url: "https://github.com/kitt1987/github-beautifier" });
	});
};
