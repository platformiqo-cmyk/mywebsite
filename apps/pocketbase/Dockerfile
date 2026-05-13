FROM debian:bookworm-slim

WORKDIR /pb

# Copy PocketBase binary and migrations
COPY pocketbase ./pocketbase
COPY pb_migrations ./pb_migrations
COPY pb_hooks ./pb_hooks

# Make binary executable
RUN chmod +x ./pocketbase

# Create data directory
RUN mkdir -p /pb/pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", \
     "--http=0.0.0.0:8090", \
     "--dir=/pb/pb_data", \
     "--migrationsDir=/pb/pb_migrations", \
     "--hooksDir=/pb/pb_hooks"]
