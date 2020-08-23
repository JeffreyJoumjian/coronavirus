const puppeteer = require('puppeteer-core');

// REPLACE this by opening Chrome and typing chrome://version and then copying the Executable Path.
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getCountryDetails() {

	// source => don't change this
	const URL = 'https://www.worldometers.info/coronavirus/';

	// if you provide a country name, you'll get another table about that country's status
	// countries may return wrong values for new cases if the website hasn't set them properly
	const countryName = process.argv[2] ? process.argv.slice(2).join(" ").toLowerCase().trim() : undefined;

	const browser = await puppeteer.launch({ executablePath, headless: true });
	let page;

	try {
		page = await browser.newPage();
		await page.goto(URL, { 'waitUntil': 'domcontentloaded' });

		console.log(`connected to ${URL}`);

		const result = await page.evaluate((countryName) => {

			// helper functions
			function getNumber(element) {
				return parseInt(element.innerText.trim().split(",").join("")) ? parseInt(element.innerText.trim().split(",").join("")) : 0;
			}
			function getInnerText(element) {
				return element.innerText ? element.innerText : 0;
			}
			function stringify(...objectArray) {
				// converts all the properties of an object to type String
				objectArray.forEach(obj => {
					Object.keys(obj).forEach(o => obj[o] = obj[o].toLocaleString());
				});
			}
			function getIndices(tableHead) {
				const indices = {};
				tableHead.childNodes.forEach((col, ind) => {
					switch (col.innerText.trim().toLowerCase().split('\n').join(" ")) {
						case 'country, other': indices.country = ind;
							break;
						case 'total cases': indices.total = ind;
							break;
						case 'new cases': indices.newCases = ind;
							break;
						case 'total deaths': indices.deaths = ind;
							break;
						case 'new deaths': indices.newDeaths = ind;
							break;
						case 'total recovered': indices.recovered = ind;
							break;
						case 'active cases': indices.active = ind;
							break;
						case 'serious, critical': indices.critical = ind;
							break;
						case 'total tests': indices.tests = ind;
							break;
						case 'population': indices.population = ind;
							break;
						default: break;
					}
				});
				return indices;
			}

			function getCountryDetails(country, indices) {
				return {
					country: getInnerText(country[indices.country]),
					total: getInnerText(country[indices.total]),
					newCases: getNumber(country[indices.newCases]),
					deaths: getNumber(country[indices.deaths]),
					newDeaths: getNumber(country[indices.newDeaths]),
					active: getInnerText(country[indices.active]),
					recovered: getInnerText(country[indices.recovered]),
					critical: getNumber(country[indices.critical]),
					deathRate: `${parseFloat((getNumber(country[indices.deaths]) * 100 /
						parseFloat(getNumber(country[indices.total]))).toFixed(2))}%`,
					realDeathRate: `${parseFloat((getNumber(country[indices.deaths]) * 100 /
						parseFloat(getNumber(country[indices.total]) - getNumber(country[indices.active]))).toFixed(2))}%`,
					tests: getInnerText(country[indices.tests]),
					population: getInnerText(country[indices.population])
				}
			}

			// const numbers = [...document.querySelectorAll('.maincounter-number > span')];
			let table = document.querySelector('table');
			const overall = table.querySelector('.total_row_world').children;

			table = {
				tableHead: table.querySelector('thead tr'),
				tableBody: [...table.querySelectorAll('tbody tr')]
			};

			const indices = getIndices(table.tableHead);



			// general numbers about the virus
			const general = {
				total: getNumber(overall[indices.total]),
				active: getNumber(overall[indices.active]),
				newCases: getNumber(overall[indices.newCases]),
				deaths: getNumber(overall[indices.deaths]),
				newDeaths: getNumber(overall[indices.newDeaths])
			}

			general.deathRate = `${parseFloat((general.deaths * 100 / general.total).toFixed(2))}%`

			const detailed = {};
			detailed.closed = general.total - general.active;
			detailed.recovered = getNumber(overall[indices.recovered]);
			detailed.realDeathRate = `${parseFloat((general.deaths * 100 / detailed.closed).toFixed(2))}%`


			let country;
			// if country is provided => get country row
			if (countryName) {
				try { country = table.tableBody.find(e => e.children[1].innerText.trim().toLowerCase() === countryName).children; }
				catch (e) { } // note can't do anything here since it would be in the browser and not the process
			}

			// stringify before returning
			stringify(general, detailed);

			return {
				general, detailed,
				// if country is provided => add country property with details
				country: country ? getCountryDetails(country, indices) : undefined
			}
		}, countryName);

		// printing
		result.country ? console.table(result.country) : countryName &&
			console.error(`\nNo entries for "${countryName}" => Check if "${countryName}" is a valid country.`);
		console.table(result.general);
		console.table(result.detailed);


		await browser.close();
	}
	catch (e) {
		console.error(e.message);
		process.exit(1);
	}
}
getCountryDetails();