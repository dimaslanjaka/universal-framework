# Tweaking yarn
- Open Powershell Or Sudo
mkdir ./tmp/npm-cache
yarn config set yarn-offline-mirror ./tmp/npm-cache
yarn config set yarn-offline-mirror-pruning true
yarn config set -- --mutex network
mv ~/.yarnrc ./
rm -rf node_modules/yarn.lock
yarn install