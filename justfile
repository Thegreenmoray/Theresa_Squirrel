
run-client:
 cd client && npm run dev

run-server:
 cd server && npm run dev

clrftolf:
 find . -type f -not -path '*/.git*' -exec dos2unix {} +

up:
 docker compose up
down:
 docker compose down