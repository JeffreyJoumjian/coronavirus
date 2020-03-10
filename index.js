const puppeteer = require('puppeteer-core');

// REPLACE this by opening Chrome and typing chrome://version and then copying the Execution Path.
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getCountryDetails(country) {
	// source
	const url = 'https://www.worldometers.info/coronavirus/';

	// if a country you provide a country name, you'll get another table about that country's status
	// China is returning a false for new cases => help is appreciated
	const countryName = process.argv[2] ? process.argv[2].toLowerCase().trim() : undefined;

	const browser = await puppeteer.launch({ executablePath });

	let page;
	try {
		page = await browser.newPage();

		await page.goto(url, { 'waitUntil': 'domcontentloaded' });

		console.log(`connected to ${url}`);

		const result = await page.evaluate((countryName) => {

			// general numbers about the virus
			const numbers = [...document.querySelectorAll('.maincounter-number > span')];
			const cases = parseFloat(numbers[0].innerText.split(",").join(""));
			const deaths = parseFloat(numbers[1].innerText.split(",").join(""));
			let country;

			// if country is provided => get country row
			if (countryName) {

				try {
					country = [...document.querySelectorAll('tbody tr td')].filter((e) => {
						return e.innerText.toLowerCase() === countryName;
					})[0].parentNode.children;
				} catch (e) {
					console.error(`${countryName} is not a valid country`);

					return;
				}

				function getNumber(element) {
					return parseInt(element.innerText.trim().split(",").join("")) ? parseInt(element.innerText.trim().split(",").join("")) : 0;
				}

				function getInnerText(element) {
					return element.innerText ? element.innerText : 0;
				}
			}

			return {
				cases: numbers[0].innerText,
				deaths: numbers[1].innerText,
				deathRate: `${parseFloat((deaths * 100 / cases).toFixed(2))}%`,

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

		if (!result) {
			console.error(`${countryName} is not a valid country`);
			process.exit();
		}

		// printing
		console.table({ cases: result.cases, deaths: result.deaths, deathRate: result.deathRate });
		result.country ? console.table(result.country) : console.log();

		await browser.close();
	}
	catch (e) {
		console.error(e.message);
	}
}
getCountryDetails();