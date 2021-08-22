const datasets = [
  {"label":"perl","data":[{"x":1069.156,"y":40.28,"r":3},{"x":1146.848,"y":56.86,"r":4},{"x":1255.884,"y":37.72,"r":4}],"borderColor":"#0298c3","backgroundColor":"#0298c350"},
  {"label":"ruby","data":[{"x":146.188,"y":77.22,"r":4}],"borderColor":"#701516","backgroundColor":"#70151650"},
  {"label":"python3","data":[{"x":323.088,"y":74.19,"r":4},{"x":499.1,"y":86.57,"r":4},{"x":241.108,"y":46.28,"r":15}],"borderColor":"#3572A5","backgroundColor":"#3572A550"},
  {"label":"julia","data":[{"x":366.209,"y":5.73,"r":6},{"x":388.569,"y":7.84,"r":9}],"borderColor":"#a270ba","backgroundColor":"#a270ba50"},
  {"label":"node","data":[{"x":1338.893,"y":38.37,"r":6},{"x":976.897,"y":41.72,"r":7},{"x":394.975,"y":16.06,"r":17}],"borderColor":"#f1e05a","backgroundColor":"#f1e05a50"},
  {"label":"racketbc","data":[{"x":389.803,"y":55.06,"r":6}],"borderColor":"#3c5caa","backgroundColor":"#3c5caa50"},
  {"label":"racket","data":[{"x":765.193,"y":68.52,"r":6}],"borderColor":"#3c5caa","backgroundColor":"#3c5caa50"},
  {"label":"chapel","data":[{"x":171.75,"y":11.04,"r":7}],"borderColor":"#8dc63f","backgroundColor":"#8dc63f50"},
  {"label":"rust","data":[{"x":150.883,"y":22.19,"r":7},{"x":135.225,"y":6.64,"r":8},{"x":135.867,"y":3.76,"r":12},{"x":133.883,"y":4.2,"r":13},{"x":131.708,"y":3.26,"r":13},{"x":136.367,"y":7.43,"r":13},{"x":158.943,"y":3.06,"r":13},{"x":134.899,"y":6.98,"r":15}],"borderColor":"#dea584","backgroundColor":"#dea58450"},
  {"label":"erlang","data":[{"x":867.508,"y":74.78,"r":7},{"x":8655.64,"y":83.13,"r":7}],"borderColor":"#B83998","backgroundColor":"#B8399850"},
  {"label":"php","data":[{"x":241.023,"y":21.13,"r":9}],"borderColor":"#4F5D95","backgroundColor":"#4F5D9550"},
  {"label":"openj9","data":[{"x":374.899,"y":13.23,"r":9},{"x":390.793,"y":12.51,"r":9},{"x":391.905,"y":6.1,"r":11},{"x":215.967,"y":50.07,"r":17},{"x":227.511,"y":29.88,"r":20}],"borderColor":"#b07219","backgroundColor":"#b0721950"},
  {"label":"java","data":[{"x":348.579,"y":7.67,"r":9},{"x":348.501,"y":7.73,"r":9},{"x":354.901,"y":5.28,"r":11},{"x":200.201,"y":37.32,"r":17},{"x":206.963,"y":19.27,"r":20}],"borderColor":"#b07219","backgroundColor":"#b0721950"},
  {"label":"sbcl","data":[{"x":614.929,"y":60.24,"r":9},{"x":614.376,"y":60.09,"r":9},{"x":153.655,"y":16.55,"r":16},{"x":152.229,"y":16.76,"r":16},{"x":512.182,"y":10.72,"r":20},{"x":579.998,"y":12.44,"r":20}],"borderColor":"#3fb68b","backgroundColor":"#3fb68b50"},
  {"label":"gpp","data":[{"x":165.701,"y":4.55,"r":9},{"x":756.347,"y":7.36,"r":11},{"x":156.402,"y":2.31,"r":12}],"borderColor":"#f34b7d","backgroundColor":"#f34b7d50"},
  {"label":"swift","data":[{"x":237.779,"y":14.49,"r":9}],"borderColor":"#ffac45","backgroundColor":"#ffac4550"},
  {"label":"csharpcore","data":[{"x":182.527,"y":6.81,"r":10},{"x":181.723,"y":3.65,"r":13}],"borderColor":"#178600","backgroundColor":"#17860050"},
  {"label":"csharpaot","data":[{"x":182.678,"y":6.66,"r":10},{"x":182.186,"y":3.69,"r":13}],"borderColor":"#178600","backgroundColor":"#17860050"},
  {"label":"dartexe","data":[{"x":309.087,"y":16.73,"r":12}],"borderColor":"#00B4AB","backgroundColor":"#00B4AB50"},
  {"label":"dartjit","data":[{"x":525.647,"y":24.82,"r":12}],"borderColor":"#00B4AB","backgroundColor":"#00B4AB50"},
  {"label":"gcc","data":[{"x":130.054,"y":4.16,"r":12}],"borderColor":"#555555","backgroundColor":"#55555550"},
  {"label":"icc","data":[{"x":129.238,"y":5.09,"r":12}],"borderColor":"#555555","backgroundColor":"#55555550"},
  {"label":"ghc","data":[{"x":637.887,"y":22.41,"r":13}],"borderColor":"#5e5086","backgroundColor":"#5e508650"},
  {"label":"go","data":[{"x":144.967,"y":10.53,"r":14},{"x":150.315,"y":9.27,"r":15},{"x":150.113,"y":8.68,"r":16},{"x":160.093,"y":7.85,"r":18}],"borderColor":"#00ADD8","backgroundColor":"#00ADD850"},
  {"label":"fsharpcore","data":[{"x":193.554,"y":6.35,"r":17},{"x":181.97,"y":4.3,"r":17}],"borderColor":"#b845fc","backgroundColor":"#b845fc50"},
  {"label":"ocaml","data":[{"x":255.321,"y":15.71,"r":18}],"borderColor":"#3be133","backgroundColor":"#3be13350"},
  {"label":"gnat","data":[{"x":258.381,"y":7.19,"r":50}],"borderColor":"#02f88c","backgroundColor":"#02f88c50"}
];

const data = datasets.map(ds => {
  return {
    x: ds.data.map(v => v.x),
    y: ds.data.map(v => v.y),
    text: ds.data.map((v, i) => `${ds.label} #${i}`),
    mode: 'markers',
    name: ds.label,
    marker: {
      color: ds.data.map(v => ds.borderColor + "90"),
      size: ds.data.map(v => v.r * 2)
    }
  };
});

const layout = {
  title: 'knucleotides',
  showlegend: true,
  height: 1000,
  width: 1000,
  xaxis: {
    title: {
      text: 'Memory (MB)',
    },
  },
  yaxis: {
    title: {
      text: 'Elapsed (sec)',
    }
  }
};


// https://github.com/plotly/plotly.js/issues/65
function legendHover(my) {
  const legends = my.querySelectorAll(".legendtoggle");

  for (const legend of legends) {
    legend.onmouseenter = (d) => {
      const traceName = d.target.previousSibling.previousSibling.getAttribute("data-unformatted");
      const cn = my.data.map(v => v.name).indexOf(traceName);
      if (cn < 0) return;

      const curve = my.data[cn].x;
      Plotly.Fx.hover('benchmarksgamevis',
        curve.map((_, i) => { return { curveNumber: cn, pointNumber: i }; })
      );
    };

    legend.onmouseleave = () => {
      Plotly.Fx.hover('benchmarksgamevis', []);
    };
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  Plotly.newPlot('benchmarksgamevis', data, layout).then(legendHover);
  document.getElementById('benchmarksgamevis')
    // https://plotly.com/javascript/hover-events/#triggering-hover-events
    .on('plotly_hover', function (eventdata) {
      for (const ed of eventdata.points) {
        const i = ed.pointIndex;
        const x = ed.data.x[i];
        const y = ed.data.y[i];
        console.info(`${ed.data.name}: ${y} seconds, ${x} MB memory`);
      }
    });
});

