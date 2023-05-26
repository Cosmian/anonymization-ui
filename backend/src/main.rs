use actix_web::{middleware::Logger, Error};
use actix_web::{web, get, post, App, HttpResponse, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::io::Read;
use reqwest::Client;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[get("/api/configurations")]
async fn fetch_configurations() -> impl Responder {
    let mut cert_file = File::open("/Users/celia-std/Documents/mse-demo/backend-deno/yaos_millionaires/cert.pem").unwrap();
    let mut cert_buffer = Vec::new();
    cert_file.read_to_end(&mut cert_buffer).unwrap();
    let client = Client::builder()
        // .danger_accept_invalid_certs(true)
        // .add_root_certificate(reqwest::Certificate::from_pem(&cert_buffer).unwrap())
        .build().unwrap();
    let response = client.get("http://127.0.0.1:5000/configurations")
        .send().await.unwrap().text().await.unwrap();
    let message: &str = &response;

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: message.to_string(),
    };
    HttpResponse::Ok().json(response_json)
}

#[derive(Deserialize)]
struct Configuration {
    name: String,
}

#[post("/api/configurations")]
async fn post_configuration(req_body: String) -> impl Responder {
    // let mut cert_file = File::open("/Users/celia-std/Documents/mse-demo/backend-deno/yaos_millionaires/cert.pem").unwrap();
    // let mut cert_buffer = Vec::new();
    // cert_file.read_to_end(&mut cert_buffer).unwrap();
    println!("{}", req_body);
    let client = Client::builder()
        // .danger_accept_invalid_certs(true)
        // .add_root_certificate(reqwest::Certificate::from_pem(&cert_buffer).unwrap())
        .build().unwrap();
    let response = client.post("http://127.0.0.1:5000/configurations/body")
        .header("Content-Type", "application/json")
        .body(req_body)
        .send().await.unwrap().text().await.unwrap();

    let message: &str = &response;

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: message.to_string(),
    };
    HttpResponse::Ok().json(response_json)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }

    println!("🚀 Server started successfully");

    HttpServer::new(move || {
        App::new()
            .service(fetch_configurations)
            .service(post_configuration)
            .wrap(Logger::default())
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
