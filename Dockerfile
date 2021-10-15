# syntax=docker/dockerfile:1

FROM nginx:1.21.3

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
