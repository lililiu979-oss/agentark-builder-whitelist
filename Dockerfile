FROM node:20-alpine
WORKDIR /app
COPY package.json server.mjs index.html ./
COPY data ./data
RUN mkdir -p data
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.mjs"]
