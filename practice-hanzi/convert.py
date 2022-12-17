import os
import re
from bs4 import BeautifulSoup

file_names = map(lambda file_name: os.path.splitext(file_name)
                 [0], os.listdir("src/animCJK/svgsZhHans"))
# file_names = ["19968", 19969]

for file_name in file_names:
    header = f'<svg id="z{file_name}" viewBox="0 0 1024 1024">'
    footer = '</svg>'

    with open(f"src/animCJK/svgsZhHans/{file_name}.svg", mode="r", encoding="UTF-8") as f:
        soup = BeautifulSoup(f, "html.parser")
    paths = soup.find_all("path", id=re.compile(f"^z{file_name}d"))
    with open(f"src/hanzi/{file_name}.svg", mode="w", encoding="UTF-8") as f:
        f.write(header+"".join(map(lambda path: str(path), paths))+footer)
