FROM nginx:latest

COPY configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY docs /usr/share/nginx/html

EXPOSE 80/tcp
