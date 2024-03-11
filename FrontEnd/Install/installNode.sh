#!/bin/bash

# Install curl or wget
if [[ $(command -v curl) ]]; then
    INSTALLER="curl -o-"
elif [[ $(command -v wget) ]]; then
    INSTALLER="wget -qO-"
else
    echo "Error: Neither curl nor wget is installed. Please install one of them."
    exit 1
fi

# Install nvm
$INSTALLER https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Source nvm script to enable it
source ~/.nvm/nvm.sh

# Install the latest Node.js version
nvm install 20

# Display Node.js and npm versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

echo "nvm installation completed."
