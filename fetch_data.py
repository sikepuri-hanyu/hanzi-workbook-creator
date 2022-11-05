# from reportlab.graphics import renderPM
# from svglib.svglib import svg2rlg
import csv
import os
import requests
from bs4 import BeautifulSoup


def get_data():
    f = open("input.txt", "r")
    data = f.read()
    f.close()
    return data


def get_page_url(hanzi):
    return f"https://hanyu.baidu.com/s?wd={hanzi}&ptype=zici"


def get_gif(hanzi):
    r = requests.get(get_page_url(hanzi))
    soup = BeautifulSoup(r.content, "html.parser")
    img_tags = soup.find_all("img")
    for img_tag in img_tags:
        url = img_tag.get("data-gif")
        if url != None:
            gif_url = url

    response = requests.get(gif_url)
    image = response.content
    file_name = f"tmp/{hanzi}.gif"
    with open(file_name, "wb") as f:
        f.write(image)


def get_svgs(hanzi):
    r = requests.get(get_page_url(hanzi))
    soup = BeautifulSoup(r.content, "html.parser")
    svgs = soup("svg")
    for i, svg in enumerate(svgs):
        f = open(f"tmp/{hanzi}{i+1}.svg", "w")
        f.write(str(svgs[i]))


def get_pronounce(hanzi):
    r = requests.get(get_page_url(hanzi))
    soup = BeautifulSoup(r.content, "html.parser")
    bolds = soup("b")
    return bolds[0].text


def export_pronounces(outputs):
    with open("tmp/pronounces.csv", "w") as f:
        writer = csv.writer(f)
        writer.writerows(outputs)


def main():
    input = get_data()
    hanzis = list(dict.fromkeys(list(input)))  # 重複を削除
    with open("tmp/pronounces.csv", "r") as f:
        reader = csv.reader(f)
        data = dict([row for row in reader])
    outputs = []
    for hanzi in hanzis:
        if hanzi in data.keys():
            outputs.append([hanzi, data[hanzi]])
        else:
            outputs.append([hanzi, get_pronounce(hanzi)])
            # get_gif(hanzi)
            if not os.path.isfile(f"tmp/{hanzi}1.svg"):
                get_svgs(hanzi)
    export_pronounces(outputs)


main()


# drawing = svg2rlg("test.svg")
# renderPM.drawToFile(drawing, "test.png", fmt="PNG")
