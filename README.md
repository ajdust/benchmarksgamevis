# Computer Language Benchmarks Game Visualization

The [Computer Language Benchmarks Game](https://benchmarksgame-team.pages.debian.net/benchmarksgame/) has a variety of programming languages "competing" in a variety of benchmark programs. Unfortunately, the site only offers effective but rudimentary visuals for the benchmark results. This repo is a quick exploration to see what visuals can be gleaned from the data.

The "alldata.csv" is copied from [the source repo](https://salsa.debian.org/benchmarksgame-team/benchmarksgame/-/tree/master/public/data) and parsed with a C# script into data.json. The visualization is done with the excellent plotly.js library.

The bubble chart of benchmarks can be [seen here](https://ajdust.github.io/benchmarksgamevis). Don't forget to zoom to look past the outliers.