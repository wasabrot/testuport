FROM node:8.2.1
WORKDIR /
RUN npm install
CMD ["node", "/src/credentials.js"]
#CMD ["sh", "-c","node", "/src/matchbot.js"]
