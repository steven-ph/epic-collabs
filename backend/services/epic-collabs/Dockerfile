FROM node:14.8.0-alpine

ARG NPM_TOKEN

WORKDIR /usr/src/app

COPY .buildkite/.npmrc .npmrc
COPY package*.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .
