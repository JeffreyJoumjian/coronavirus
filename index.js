const puppeteer = require('puppeteer-core');

// REPLACE this by opening Chrome and typing chrome://version and then copying the Execution Path.
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getCountryDetails() {

	// source => don't change this
	const URL = 'https://www.worldometers.info/coronavirus/';

	// if you provide a country name, you'll get another table about that country's status
	// countries may return wrong values for new cases if the website hasn't set them properly
	const countryName = process.argv[2] ? process.argv[2].toLowerCase().trim() : undefined;

	const browser = await puppeteer.launch({ executablePath });
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
			function stringify(objectArray) {
				// converts all the properties of an object to type String
				objectArray.forEach(obj => {
					Object.keys(obj).forEach(o => obj[o] = obj[o].toLocaleString());
				});
			}

			const numbers = [...document.querySelectorAll('.maincounter-number > span')];
			const table = [...document.querySelectorAll('tbody tr td')];

			// general numbers about the virus
			const general = {
				total: getNumber(numbers[0]),
				new: getNumber(table.filter(e => e.innerText.toLowerCase() === 'total:')[0].parentNode.children[2]),
				deaths: getNumber(numbers[1]),
			}
			general.deathRate = `${parseFloat((general.deaths * 100 / general.total).toFixed(2))}%`


			const detailed = {
				active: general.total - general.deaths - getNumber(numbers[2]),
				recovered: getNumber(numbers[2])
			}
			detailed.closed = general.total - detailed.active;
			detailed.realDeathRate = `${parseFloat((general.deaths * 100 / detailed.closed).toFixed(2))}%`


			let country;
			// if country is provided => get country row
			if (countryName) {
				try { country = table.filter(e => e.innerText.toLowerCase() === countryName)[0].parentNode.children; }
				catch (e) { } // note can't do anything here since it would be in the browser and not the process
			}

			// stringify before returning
			stringify([general, detailed]);

			return {
				general, detailed,
				// if country is provided => add country property with details
				country: country ? {
					country: getInnerText(country[0]),
					totalCases: getInnerText(country[1]),
					newCases: getNumber(country[2]),
					deaths: getNumber(country[3]),
					newDeaths: getNumber(country[4]),
					deathRate: `${parseFloat((getNumber(country[3]) * 100 /
						parseFloat(getNumber(country[1]))).toFixed(2))}%`,
					recovered: getInnerText(country[5]),
					active: getInnerText(country[6]),
					critical: getNumber(country[7]),
				} : undefined
			}
		}, countryName);

		// printing
		result.country ? console.table(result.country) :
			result.country === null ? console.error(`\n${countryName} is not a valid country`) : console.log();
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