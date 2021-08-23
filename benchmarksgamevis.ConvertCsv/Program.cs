using System;
using System.Linq;
using System.Text.Json;
using System.Collections.Generic;
using System.IO;
using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration.Attributes;
using MoreLinq;

namespace benchmarksgamevis.ConvertCsv
{
    class Program
    {
        static void Main()
        {
            var langPath = @"../language_colors.json";
            var csvPath = @"../alldata.csv";
            var outPath = @"../site/data.json";

            var langColors = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase);
            {
                var langColorJson = File.ReadAllText(langPath);
                var langColors_ = JsonSerializer.Deserialize<Dictionary<string, string>>(langColorJson);
                foreach (var lang in langColors_)
                    langColors[lang.Key] = lang.Value;

                langColors["python3"] = langColors["python"];
                langColors["node"] = langColors["javascript"];
                langColors["racketbc"] = langColors["racket"];
                langColors["csharpaot"] = langColors["c#"];
                langColors["csharpcore"] = langColors["c#"];
                langColors["fsharpcore"] = langColors["f#"];
                langColors["dartexe"] = langColors["dart"];
                langColors["dartjit"] = langColors["dart"];
                langColors["openj9"] = langColors["java"];
                langColors["gpp"] = langColors["c++"];
                langColors["gcc"] = langColors["c"];
                langColors["icc"] = langColors["c"];
                langColors["gnat"] = langColors["ada"];
                langColors["ifc"] = langColors["fortran"];
                langColors["gfortran"] = langColors["fortran"];
                langColors["sbcl"] = langColors["common lisp"];
                langColors["ghc"] = langColors["haskell"];
                langColors["fpascal"] = langColors["pascal"];
                langColors["clang"] = langColors["c++"];
                langColors["mri"] = langColors["ruby"];
                langColors["pharo"] = langColors["smalltalk"];
                langColors["vw"] = langColors["scheme"];
            }

            using var reader = new StreamReader(csvPath);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<Row>().ToList();

            // assumes same Name / Language / Id(Size) / N / Status(0)
            static Row AverageOfGroup(ICollection<Row> rows)
            {
                var (tcpu, tmem, tload1, tload2, tload3, tload4, telapsed, tbusy) = (0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
                foreach (var row in rows)
                {
                    tcpu += row.CPU;
                    tmem += row.MemoryKB;
                    telapsed += row.ElapsedS;
                    tbusy += row.BusyS;
                    var loads = row.Load.Replace('%', ' ')
                        .Split(' ', 4, StringSplitOptions.RemoveEmptyEntries)
                        .Select(x => double.Parse(x)).ToList();
                    tload1 += loads[0];
                    tload2 += loads[1];
                    tload3 += loads[2];
                    tload4 += loads[3];
                }

                var first = rows.First();
                return new Row
                {
                    Name = first.Name,
                    Language = first.Language,
                    Id = first.Id,
                    Size = first.Size,
                    N = first.N,
                    Status = 0,
                    CPU = Math.Round(tcpu / rows.Count, 2),
                    MemoryKB = (int)(Math.Round(tmem / rows.Count)),
                    ElapsedS = Math.Round(telapsed / rows.Count, 2),
                    BusyS = Math.Round(tbusy / rows.Count, 2),
                    Load = $"{Math.Round(tload1 / rows.Count)}% {Math.Round(tload2 / rows.Count)}% {Math.Round(tload3 / rows.Count)}% {Math.Round(tload4 / rows.Count)}%",
                };
            }

            var final = records
                .Where(x => x.Status == 0 && x.Load != "%") // remove bad records
                .GroupBy(x => new { x.Name, x.Language, x.Id })
                .Select(x => AverageOfGroup(x.MaxBy(y => y.N).ToList())) // average duplicate runs for programs in largest N
                .GroupBy(x => x.Name) // one chart for each test type
                .ToDictionary(x => x.Key, nameGrp =>
                    new PlotlyChart(
                        new(nameGrp.Key, true, 1000, 1000, new(new("Memory(MB)")), new(new("Elapsed(sec)"))),
                        nameGrp
                            .GroupBy(x => x.Language) // one trace for each language
                            .Select(langGrp => new PlotlyTrace(
                                mode: "markers",
                                name: langGrp.Key,
                                x: langGrp.Select(x => Math.Round(x.MemoryKB / 1e3, 2)),
                                y: langGrp.Select(x => x.ElapsedS),
                                meta: langGrp.Select(x => new Meta($"{x.Language}-{x.Id}", x.Size)),
                                text: langGrp.Select(x => $"{x.Language} #{x.Id}: {x.ElapsedS} seconds, {Math.Round(x.MemoryKB / 1e3, 2)} memory(MB), {x.Size} gz"),
                                marker: new(
                                    langColors[langGrp.Key] + "90", // 90% opacity on marker shape color
                                    langGrp.Select(x => Math.Round(x.Size / 50.0)), // GZ size is the radius of the marker
                                    new(langColors[langGrp.Key], 2) // 2 width marker border
                                )
                            )).ToList()
                    )
                );

            File.WriteAllText(outPath, JsonSerializer.Serialize(final));
        }

        record PlotlyLine(string color, double width);
        record PlotlyMarker(string color, IEnumerable<double> size, PlotlyLine line);
        record Meta(string id, int size);
        record PlotlyTrace(string mode, string name, IEnumerable<double> x, IEnumerable<double> y, IEnumerable<string> text, IEnumerable<Meta> meta, PlotlyMarker marker);

        record PlotlyTitle(string text);
        record PlotlyAxis(PlotlyTitle title);
        record PlotlyLayout(string title, bool showLegend, int height, int width, PlotlyAxis xaxis, PlotlyAxis yaxis);

        record PlotlyChart(PlotlyLayout layout, List<PlotlyTrace> data);

        record Row
        {
            [Name("name")] public string Name { get; init; }
            [Name("lang")] public string Language { get; init; }
            [Name("id")] public int Id { get; init; }
            [Name("n")] public int N { get; init; }
            [Name("size(B)")] public int Size { get; init; }
            [Name("cpu(s)")] public double CPU { get; init; }
            [Name("mem(KB)")] public int MemoryKB { get; init; }
            [Name("status")] public int Status { get; init; }
            [Name("load")] public string Load { get; init; }
            [Name("elapsed(s)")] public double ElapsedS { get; init; }
            [Name("busy(s)")] public double BusyS { get; init; }
        }

    }
}
