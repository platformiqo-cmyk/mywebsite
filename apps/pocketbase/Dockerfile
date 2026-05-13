FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates wget unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /pb

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.25.0/pocketbase_0.25.0_linux_amd64.zip \
    && unzip pocketbase_0.25.0_linux_amd64.zip \
    && rm pocketbase_0.25.0_linux_amd64.zip \
    && chmod +x ./pocketbase

COPY pb_migrations ./pb_migrations

RUN mkdir -p /pb/pb_data

EXPOSE 8090

CMD ["./pocketbase", "serve", \
     "--http=0.0.0.0:8090", \
     "--dir=/pb/pb_data", \
     "--migrationsDir=/pb/pb_migrations", \
     "--hooksWatch=false"]