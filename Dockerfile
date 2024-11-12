# FROM node:20
 
# WORKDIR /usr/src/app
 
# COPY package*.json ./
 
# RUN npm install
 
# COPY . .
 
# EXPOSE 3000
 
# CMD [ "npm", "start" ]

# Stage 1: Build ReactJS app
FROM node:20-alpine AS build

# Cài đặt Node.js và npm (nếu sử dụng Alpine hoặc cần bổ sung)

WORKDIR /app
RUN apk update && apk add nodejs npm

# Sao chép package.json và cài đặt các phụ thuộc
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn của ứng dụng React vào container
COPY . .

# Xây dựng ứng dụng React
RUN npm run build && ls /app/build

# Stage 2: Set up Nginx with built React app
FROM nginx:stable-alpine

# Sao chép build vào thư mục Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

