FROM node:10.16.3 as builder
COPY . ./backend-restfull-food
WORKDIR /backend-restfull-food
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]