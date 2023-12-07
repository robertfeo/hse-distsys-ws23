sudo apt update -q
sudo apt upgrade -y -q
#sdk install java 17.0.4.1-tem < /dev/null
#NODEJS_VERSION="21.0.0"
#nvm install $NODEJS_VERSION -y
#nvm use $NODEJS_VERSION && nvm alias default $NODEJS_VERSION
jq -r ".CODESPACE_NAME" /workspaces/.codespaces/shared/environment-variables.json > /workspaces/.codespaces/shared/CODESPACE_NAME
echo Y | sdk upgrade
npm install -g npm@10.2.1
#docker-compose up --build -d