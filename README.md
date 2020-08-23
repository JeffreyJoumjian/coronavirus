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
┌───────────┬──────────────┐
│  (index)  │    Values    │
├───────────┼──────────────┤
│   total   │ '23,468,144' │
│  active   │ '6,669,153'  │
│ newCases  │   '96,958'   │
│  deaths   │  '810,182'   │
│ newDeaths │   '2,233'    │
│ deathRate │   '3.45%'    │
└───────────┴──────────────┘
┌───────────────┬──────────────┐
│    (index)    │    Values    │
├───────────────┼──────────────┤
│    closed     │ '16,798,991' │
│   recovered   │ '15,988,809' │
│ realDeathRate │   '4.82%'    │
└───────────────┴──────────────┘
```

2 - `node index.js <country-name>`

```
-> node index.js "lebanon"

connected to https://www.worldometers.info/coronavirus/
┌───────────────┬─────────────┐
│    (index)    │   Values    │
├───────────────┼─────────────┤
│    country    │  'Lebanon'  │
│     total     │  '12,698'   │
│   newCases    │     507     │
│    deaths     │     123     │
│   newDeaths   │      2      │
│    active     │   '8,950'   │
│   recovered   │   '3,625'   │
│   critical    │     75      │
│   deathRate   │   '0.97%'   │
│ realDeathRate │   '3.28%'   │
│     tests     │  '462,531'  │
│  population   │ '6,820,890' │
└───────────────┴─────────────┘
┌───────────┬──────────────┐
│  (index)  │    Values    │
├───────────┼──────────────┤
│   total   │ '23,469,609' │
│  active   │ '6,670,323'  │
│ newCases  │   '98,423'   │
│  deaths   │  '810,242'   │
│ newDeaths │   '2,293'    │
│ deathRate │   '3.45%'    │
└───────────┴──────────────┘
┌───────────────┬──────────────┐
│    (index)    │    Values    │
├───────────────┼──────────────┤
│    closed     │ '16,799,286' │
│   recovered   │ '15,989,044' │
│ realDeathRate │   '4.82%'    │
└───────────────┴──────────────┘
```
