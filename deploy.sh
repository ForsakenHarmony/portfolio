git reset HEAD --hard
git pull
docker build -t harmony/portfolio .
docker-compose up -d
