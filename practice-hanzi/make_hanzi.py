import os
import re
from bs4 import BeautifulSoup

file_names = list(map(lambda file_name: os.path.splitext(file_name)
                      [0], filter(lambda file_name: file_name.endswith(
                          ".svg"), os.listdir("src/hanzi"))))
output = 'import React, { Suspense } from "react";'
for file_name in file_names:
    output += f'const Hanzi{file_name} = React.lazy(() => import("./hanzi/{file_name}"));'
output += 'export default function Hanzi({hanziNumber,width,height,}: {hanziNumber: number;width?: string;height?: string;}) {return (<><Suspense fallback={<>Loading...</>}>'
for file_name in file_names:
    output += f'{{hanziNumber==={file_name} && <Hanzi{file_name} width={{width}} height={{height}} />}}'
output += '</Suspense></>);}'
with open("src/Hanzi.tsx", mode="w", encoding="UTF-8") as f:
    f.write(output)
