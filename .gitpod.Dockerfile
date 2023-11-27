FROM gitpod/workspace-full:2022-10-25-06-57-58

SHELL ["/bin/bash", "-c"]
#RUN source "/home/gitpod/.sdkman/bin/sdkman-init.sh"  \
#    && sdk install java 17.0.4.1-tem < /dev/null

RUN bash -c 'VERSION="21.2.0" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

#RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
