FROM nginx:latest
LABEL description="CORE public wiki"
COPY ./docs /usr/share/nginx/html
EXPOSE 80/tcp