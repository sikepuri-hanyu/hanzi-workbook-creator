import csv
import glob

with open("tmp/pronounces.csv") as f:
    reader = csv.reader(f)
    inputs = [row for row in reader]


f = open("tmp/main.html", "w")
f.write('<head><link rel="stylesheet" href="./style.css" /></head>')
for input in inputs:
    hanzi = input[0]
    files = sorted(glob.glob(f"tmp/{hanzi}*.svg"))
    f.write('<div class="char">')
    f.write('<div class = "title" lang = "zh-cmn-Hans" >')
    f.write(f'<div class="pinyin">{input[1]}</div>')
    f.write(f'<div class="hanzi">{hanzi}</div>')
    f.write('</div>')
    f.write('<div class = "wrapper">')
    f.write('<div class = "strokes" >')
    for file in files:
        svg = open(file, "r")
        data = svg.read()
        f.write(str(data))
        svg.close()
    f.write('</div>')
    f.write('<div class = "playgrounds" >')
    f.write(
        f'<div class = "playground" lang = "zh-cmn-Hans" style = "color: #cccccc" > {hanzi} </div>')
    for i in range(5):
        f.write('<div class = "playground" > </div>')
    f.write('</div>')
    f.write('</div>')
    f.write('</div>')
