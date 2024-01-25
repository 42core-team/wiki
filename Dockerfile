FROM node:latest
LABEL description="CORE public wiki"

WORKDIR /docs

COPY ./docs /docs

RUN npm install -g docsify-cli@latest
EXPOSE 3000/tcp
ENTRYPOINT docsify serve .