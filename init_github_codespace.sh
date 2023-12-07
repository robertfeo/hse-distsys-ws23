sudo apt update -q
sudo apt upgrade -y -q
curl https://cli-assets.heroku.com/install.sh | sh
jq -r ".CODESPACE_NAME" /workspaces/.codespaces/shared/environment-variables.json > /workspaces/.codespaces/shared/CODESPACE_NAME
if [ -s "/usr/local/sdkman/bin/sdkman-init.sh" ]; then
    source "/usr/local/sdkman/bin/sdkman-init.sh"
else
    echo "SDKMAN initialization script not found!"
    exit 1
fi
sdk selfupdate force
echo Y | sdk upgrade
npm install -g npm@10.2.1