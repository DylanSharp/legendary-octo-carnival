FROM --platform=linux/amd64 node:alpine

WORKDIR /app

# We don't copy eveything here because if we did it would re-run this every time a file changed.
# We only want this to re-run if package.json is changed.
COPY package*.json ./

RUN npm install

COPY . .

# Our app is running on localhost port 80
# When running in the container this will be the same so we need to expose port 80 of the container.
EXPOSE 80
EXPOSE 8080

CMD ["node", "app.js"]