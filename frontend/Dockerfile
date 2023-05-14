FROM node:18.16.0-bullseye-slim
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
CMD [ "yarn", "start" ]