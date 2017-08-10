FROM node:8.2.1
ADD . /testuport
WORKDIR /testuport
RUN npm install
#CMD ["node", "/src/credentials.js"]
CMD ["sh", "-c","node src/createcredential.js"]
#CMD ["sh", "-c","pwd"]
#CMD ["sh", "-c","node", "/src/matchbot.js"]
