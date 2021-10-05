# syntax=docker/dockerfile:1

FROM node:14.15.4

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
