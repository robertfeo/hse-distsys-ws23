cd backend/

mvn clean package

cd ..

npm install -g npm@10.2.1

cd frontend/

npm install --silent

cd ..

docker-compose up -d