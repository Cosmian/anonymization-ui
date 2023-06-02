use actix_cors::Cors;
use actix_web::{middleware::Logger, web::Path, HttpRequest};
use actix_web::{get, post, delete, App, HttpResponse, HttpServer, Responder};
use serde::{Serialize};
use reqwest::Client;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[get("/api/configurations")]
async fn get_configurations() -> impl Responder {
    // let mut cert_file = File::open("/Users/celia-std/Documents/mse-demo/backend-deno/yaos_millionaires/cert.pem").unwrap();
    // let mut cert_buffer = Vec::new();
    // cert_file.read_to_end(&mut cert_buffer).unwrap();
    let client = Client::builder()
        // .danger_accept_invalid_certs(true)
        // .add_root_certificate(reqwest::Certificate::from_pem(&cert_buffer).unwrap())
        .build().unwrap();
    let response = client.get("http://127.0.0.1:5000/configurations")
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[get("/api/configurations/{configuration_id}")]
async fn get_configuration_by_id(
    configuration_id: Path<(String,)>,
) -> impl Responder {
    let configuration_id = configuration_id.to_owned().0;
    let client = Client::builder()
        .build().unwrap();
    let url = format!("http://127.0.0.1:5000/configurations/{}", configuration_id);
    let response = client.get(url)
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[post("/api/configurations")]
async fn post_configuration(req_body: String) -> impl Responder {
    // let mut cert_file = File::open("/Users/celia-std/Documents/mse-demo/backend-deno/yaos_millionaires/cert.pem").unwrap();
    // let mut cert_buffer = Vec::new();
    // cert_file.read_to_end(&mut cert_buffer).unwrap();
    let client = Client::builder()
        // .danger_accept_invalid_certs(true)
        // .add_root_certificate(reqwest::Certificate::from_pem(&cert_buffer).unwrap())
        .build().unwrap();
    let response = client.post("http://127.0.0.1:5000/configurations/body")
        .header("Content-Type", "application/json")
        .body(req_body)
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[delete("/api/configurations/{configuration_id}")]
async fn delete_configuration(
    configuration_id: Path<(String,)>,
) -> impl Responder {
    let configuration_id = configuration_id.to_owned().0;
    let client = Client::builder()
        .build().unwrap();
    let url = format!("http://127.0.0.1:5000/configurations/{}", configuration_id);
    let response = client.delete(url)
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[post("/api/anonymize/{configuration_id}")]
async fn post_anonymize(req_body: String, request: HttpRequest, configuration_id: Path<(String,)>) -> impl Responder {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("http://127.0.0.1:5000/anonymize/{}", configuration_id);
    let content_type = request.headers().get("content-type").unwrap().to_str().unwrap().to_string();
    let client = Client::builder()
        .build().unwrap();
    let response = client.post(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[get("/api/anonymizations")]
async fn get_anonymizations() -> impl Responder {
    let client = Client::builder()
        .build().unwrap();
    let response = client.get("http://127.0.0.1:5000/anonymizations")
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[delete("/api/anonymizations/{anonymization_name}")]
async fn delete_anonymization(
    anonymization_name: Path<(String,)>,
) -> impl Responder {
    let anonymization_name = anonymization_name.to_owned().0;
    let client = Client::builder()
        .build().unwrap();
    let url = format!("http://127.0.0.1:5000/anonymizations/{}", anonymization_name);
    let response = client.delete(url)
        .send().await.unwrap().text().await.unwrap();

    let response_json = &GenericResponse {
        status: "success".to_string(),
        message: response,
    };
    HttpResponse::Ok().json(response_json)
}

#[get("/api/anonymizations/{anonymization_name}")]
async fn get_anonymization_by_name(
    anonymization_name: Path<(String,)>,
) -> impl Responder {
    let anonymization_name = anonymization_name.to_owned().0;
    let client = Client::builder()
        .build().unwrap();
    let url = format!("http://127.0.0.1:5000/anonymizations/{}", anonymization_name);
    let response = client.get(url)
        .send().await.unwrap().text().await.unwrap();

    HttpResponse::Ok().body(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }

    println!("🚀 Server started successfully");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method()
            .expose_any_header();
        App::new()
            .service(get_configurations)
            .service(get_configuration_by_id)
            .service(post_configuration)
            .service(delete_configuration)
            .service(post_anonymize)
            .service(get_anonymizations)
            .service(delete_anonymization)
            .service(get_anonymization_by_name)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
