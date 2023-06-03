FROM node:18-alpine

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

RUN yarn install

ADD . .

EXPOSE 3030

CMD ["yarn", "dev"]