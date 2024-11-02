FROM node:20.16.0-alpine
WORKDIR /app

# Add necessary permissions
RUN chown -R node:node /app

# Switch to node user
USER node

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# Copy app files
COPY --chown=node:node . .

EXPOSE 5173

# Initialize node_modules with correct permissions
RUN mkdir -p /app/node_modules/.vite && \
    chmod 777 /app/node_modules/.vite

CMD ["npm", "run", "dev", "--", "--host"]