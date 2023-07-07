FROM rust:latest AS builder

COPY . /app
WORKDIR /app
RUN cargo build --release


FROM ubuntu:22.04

COPY --from=builder /app/target/release/backend /usr/bin/
CMD ["backend"]
