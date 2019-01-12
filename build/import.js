window.onload = function() {
	var imports = document.querySelectorAll('link[rel="import"]');
	var aside = document.querySelector('aside');

	for(var i = 0; i < imports.length; i++) {
		// eslint-disable-next-line no-console
		console.log('Importing',imports[i].import);
		var import_template = imports[i].import;
		var template = document.importNode(import_template.getElementById('settings').content, true);

		aside.appendChild(template);
	}
};
