FROM debian:bookworm-slim

WORKDIR /pb

COPY pocketbase ./pocketbase
COPY pb_migrations ./pb_migrations
COPY pb_hooks ./pb_hooks

RUN chmod +x ./pocketbase
RUN mkdir -p /pb/pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", \
     "--http=0.0.0.0:8090", \
     "--encryptionEnv=PB_ENCRYPTION_KEY", \
     "--dir=/pb/pb_data", \
     "--migrationsDir=/pb/pb_migrations", \
     "--hooksDir=/pb/pb_hooks", \
     "--hooksWatch=false"]