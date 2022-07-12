FROM --platform=linux/amd64 node

RUN apt-get update -y &&  \
    apt-get -y install cron

WORKDIR /var/www/app

# We don't copy eveything here because if we did it would re-run this every time a file changed.
# We only want this to re-run if package.json is changed.
COPY package*.json ./

RUN npm install

COPY . .

# Our app is running on localhost port 3000
# When running in the container this will be the same so we need to expose port 3000 of the container.
EXPOSE 3000

CMD ["npm", "run", "start"]
