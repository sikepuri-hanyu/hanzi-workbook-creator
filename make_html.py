import csv
import glob

with open("tmp/pronounces.csv") as f:
    reader = csv.reader(f)
    inputs = [row for row in reader]


html = ""
html += '<head><link rel="stylesheet" href="./style.css" /></head>'
for input in inputs:
    hanzi = input[0]
    files = sorted(glob.glob(f"tmp/{hanzi}*.svg"))
    html += '<div class="char">'
    html += '<div class = "title" lang = "zh-cmn-Hans" >'
    html += f'<div class="pinyin">{input[1]}</div>'
    html += f'<div class="hanzi">{hanzi}</div>'
    html += '</div>'
    html += '<div class = "wrapper">'
    html += '<div class = "strokes" >'
    for file in files:
        svg = open(file, "r")
        data = svg.read()
        html += str(data)
        svg.close()
    html += '</div>'
    html += '<div class = "playgrounds" >'
    html += f'<div class = "playground" lang = "zh-cmn-Hans" style = "color: #cccccc" > {hanzi} </div>'
    for i in range(5):
        html += '<div class = "playground" > </div>'
    html += '</div>'
    html += '</div>'
    html += '</div>'

f = open("tmp/main.html", "w")
f.write(html)
f.close()
