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
│   cases   │ '114,285' │
│  deaths   │  '4,009'  │
│ deathRate │  '3.51%'  │
└───────────┴───────────┘
```

2 - `node index.js <country-name>`

```
–> node index.js france
connected to https://www.worldometers.info/coronavirus/
┌───────────┬───────────┐
│  (index)  │  Values   │
├───────────┼───────────┤
│   cases   │ '114,285' │
│  deaths   │  '4,009'  │
│ deathRate │  '3.51%'  │
└───────────┴───────────┘
┌────────────┬──────────┐
│  (index)   │  Values  │
├────────────┼──────────┤
│  country   │ 'France' │
│ totalCases │ '1,412'  │
│  newCases  │   203    │
│   deaths   │    30    │
│ newDeaths  │    11    │
│ deathRate  │ '2.12%'  │
│ recovered  │   '12'   │
│   active   │ '1,370'  │
│  critical  │    66    │
└────────────┴──────────┘
```
