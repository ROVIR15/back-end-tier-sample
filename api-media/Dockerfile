FROM node:14 as builder

# Run NPM INSTALL FIRST
RUN npm install

# Install netcat for making the 'depends_on' docker funtion works
# Neccessary if there is service needs to db up first

# RUN apt-get -q update && apt-get -qy install netcat

WORKDIR /app
COPY package*.json ./

COPY . .

EXPOSE 4225
CMD npm start

# FROM nginx:stable
# WORKDIR /app
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/dist/ /app/