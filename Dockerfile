FROM node:10.16.3 as builder
COPY . ./backend-restfull-food
WORKDIR /backend-restfull-food
RUN npm install
CMD [ "npm", "start" ]