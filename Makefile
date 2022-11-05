output.pdf:input.txt
	python3 fetch_data.py
	node toPng.js
	python3 make_html.py
	vivliostyle build tmp/main.html -s a4 -o output.pdf