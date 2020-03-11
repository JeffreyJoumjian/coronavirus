# coronavirus

A small Node JS program to quickly check coronavirus statistics from https://www.worldometers.info/coronavirus/

# Installation

`clone https://github.com/JeffreyJoumjian/coronavirus.git`

- Make sure you have Chrome installed on you computer. </span>
- Make sure you have [NodeJS & npm](https://nodejs.org/en/) installed on your computer. </span>

I have included the node_modules folder. It's always recommended to run `npm install` to make sure everything is up to date.

# Setup

1 - Open Chrome and type `chrome://version` in the search bar.

2 - Copy the Executable Path and replace the variable:
`const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'`

3 - It is recommended to create a bash/zsh alias to run the program easily with 1 command.

# Run

`node index.js <optional-country>`

1 - `node index.js`

```
–> node index.js
connected to https://www.worldometers.info/coronavirus/
┌───────────┬───────────┐
│  (index)  │  Values   │
├───────────┼───────────┤
│   total   │ '119,389' │
│  deaths   │  '4,300'  │
│ newCases  │   '466'   │
│ newDeaths │   '26'    │
│ deathRate │  '3.6%'   │
└───────────┴───────────┘
┌───────────────┬──────────┐
│    (index)    │  Values  │
├───────────────┼──────────┤
│    active     │ '48,506' │
│   recovered   │ '66,583' │
│    closed     │ '70,883' │
│ realDeathRate │ '6.07%'  │
└───────────────┴──────────┘
```

2 - `node index.js <country-name>`

```
–> node index.js italy
connected to https://www.worldometers.info/coronavirus/
┌────────────┬──────────┐
│  (index)   │  Values  │
├────────────┼──────────┤
│  country   │ 'Italy'  │
│    total   │ '10,149' │
│  newCases  │    0     │
│   deaths   │   631    │
│ newDeaths  │    0     │
│ deathRate  │ '6.22%'  │
│ recovered  │ '1,004'  │
│   active   │ '8,514'  │
│  critical  │   877    │
└────────────┴──────────┘
┌───────────┬───────────┐
│  (index)  │  Values   │
├───────────┼───────────┤
│   total   │ '119,389' │
│  deaths   │  '4,300'  │
│ newCases  │   '466'   │
│ newDeaths │   '26'    │
│ deathRate │  '3.6%'   │
└───────────┴───────────┘
┌───────────────┬──────────┐
│    (index)    │  Values  │
├───────────────┼──────────┤
│    active     │ '48,506' │
│   recovered   │ '66,583' │
│    closed     │ '70,883' │
│ realDeathRate │ '6.07%'  │
└───────────────┴──────────┘
```
