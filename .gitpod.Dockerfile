FROM gitpod/workspace-full:2022-10-25-06-57-58

SHELL ["/bin/bash", "-c"]

RUN bash -c 'VERSION="21.2.0" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'
