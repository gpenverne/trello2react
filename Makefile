install:
	npm install
	cp config.json.dist config.json
fetch:
	nodejs src/Fetch.js
	cp data.json src/collection.json

start: fetch
	npm start

build: fetch
	npm run-script build
	rm -rf build||echo "build folder does not exist"
	mv build/200.html build/index.html
