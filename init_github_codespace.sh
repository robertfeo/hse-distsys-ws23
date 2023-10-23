sudo apt update -q
sudo apt upgrade -y -q
sdk install java 17.0.4.1-tem < /dev/null
NODEJS_VERSION="21.0.0"
nvm install $NODEJS_VERSION -y
nvm use $NODEJS_VERSION && nvm alias default $NODEJS_VERSION
cd backend/
mvn clean package
cd ..
npm install -g npm@10.2.1
cd frontend/
npm install --silent
cd ..
docker-compose up --build -d