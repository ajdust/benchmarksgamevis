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

function getCurrentTest() {
  return document.getElementById("test-select").value;
}

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("test-select").onchange = function() { window.location.reload() };

  const resp = await fetch('data.json');
  const all = await resp.json();
  const ctest = getCurrentTest();
  Plotly.newPlot('benchmarksgamevis', all[ctest].data, all[ctest].layout).then(legendHover);

  const logs = [];

  // https://plotly.com/javascript/hover-events/#triggering-hover-events
  document.getElementById('benchmarksgamevis')
    .on('plotly_hover', function (eventdata) {
      for (const ed of eventdata.points) {

        const test = getCurrentTest();
        const baseUrl = "https://benchmarksgame-team.pages.debian.net/benchmarksgame";
        const pid = ed.meta.id;
        const message = `<div id="log-msg">
          <a href="${baseUrl}/performance/${test}.html" target="_blank">${test}</a>
          <a href="${baseUrl}/program/${test}-${ed.meta.id}.html" target="_blank"><b>${ed.meta.id}</b></a>
          ${ed.y} seconds, ${ed.x} MB memory, ${ed.meta.size} gz
          </div>`;

        if (logs.some(x => x === message))
          continue;

        logs.push(message);
        if (logs.length > 10) {
          logs.shift(1);
        }

        const html = logs.join('\n');
        document.getElementById('log').innerHTML = html;
      }
    });
});