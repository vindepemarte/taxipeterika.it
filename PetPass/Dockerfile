FROM node:18

WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies using npm install instead of npm ci
RUN npm install

# Copy the rest of the application
COPY . .

# Remove any existing .next directory to force clean build
RUN rm -rf .next

# Generate Prisma client
RUN npx prisma generate

# Build the application with clean cache
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 