.PHONY: setup dev start test test-watch clean

setup:
	npm install
	node scripts/seed.js

dev:
	npm run dev

start:
	npm start

test:
	npm test

test-watch:
	npm run test:watch

clean:
	rm -f linkstash.db
	rm -rf node_modules
