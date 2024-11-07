# FROM node:20-alpine as build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:20-alpine

# WORKDIR /app
# COPY --from=build /app/build /app/build

# RUN npm install -g serve

# EXPOSE 3000

# CMD ["serve", "-s", "build", "-l", "3000"]

FROM node:20
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]

