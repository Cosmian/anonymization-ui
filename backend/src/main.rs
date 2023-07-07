use std::io::prelude::*;
use std::fs::File;
use std::env;

use actix_cors::Cors;

#[get("/health")]
async fn check_health(reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let url = format!("{}/health", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.get(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}
use actix_web::{middleware::Logger, web::{Path, self}, HttpRequest};
use actix_web::{get, post, delete, put, App, HttpResponse, HttpServer};
use reqwest::{Client, StatusCode};
use backend::error::AnonymizationError;
use dotenv::dotenv;

#[get("/configurations")]
async fn get_configurations(reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let url = format!("{}/configurations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.get(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[get("/configurations/{configuration_id}")]
async fn get_configuration_by_id(
    configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>
) ->  Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/configurations/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let response = reqwest_client.get(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[post("/configurations")]
async fn post_configuration(req_body: String, request: HttpRequest, reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let content_type = request.headers().get("content-type").ok_or_else(|| AnonymizationError::InvalidRequest("Missing content-type".to_string()))?;
    let url = format!("{}/configurations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.post(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[delete("/configurations/{configuration_id}")]
async fn delete_configuration(
    configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/configurations/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let response = reqwest_client.delete(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[put("/configurations/{configuration_id}")]
async fn update_configuration(
    configuration_id: Path<(String,)>, req_body: String, request: HttpRequest, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let content_type = request.headers().get("content-type").ok_or_else(|| AnonymizationError::InvalidRequest("Missing content-type".to_string()))?;
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/configurations/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let response = reqwest_client.put(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[post("/anonymize/{configuration_id}")]
async fn post_anonymize(req_body: String, request: HttpRequest, configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/anonymize/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let content_type = request.headers().get("content-type").ok_or_else(|| AnonymizationError::InvalidRequest("Missing content-type".to_string()))?;
    let response = reqwest_client.post(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[get("/anonymizations")]
async fn get_anonymizations(reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let url = format!("{}/anonymizations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.get(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[delete("/anonymizations/{anonymization_name}")]
async fn delete_anonymization(
    anonymization_name: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let anonymization_name = anonymization_name.to_owned().0;
    let url = format!("{}/anonymizations/{}", env::var("MICROSERVICE_URL")?, anonymization_name);
    let response = reqwest_client.delete(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

#[get("/anonymizations/{anonymization_name}")]
async fn get_anonymization_by_name(
    anonymization_name: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let anonymization_name = anonymization_name.to_owned().0;
    let url = format!("{}/anonymizations/{}", env::var("MICROSERVICE_URL")?, anonymization_name);
    let response = reqwest_client.get(url)
        .send().await?;

    match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    }
}

fn instantiate_reqwest_client() -> Result<Client, AnonymizationError> {
    let mut cert_file = File::open(env::var("MICROSERVICE_CERT_PATH")?)?;
    let mut cert_buffer = Vec::new();
    cert_file.read_to_end(&mut cert_buffer)?;
    let client = Client::builder()
        .add_root_certificate(reqwest::Certificate::from_pem(&cert_buffer)?)
        .build()?;
    Ok(client)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }

    let client = instantiate_reqwest_client().expect("Error on reqwest client instantiation");
    let port: u16 = std::env::var("API_PORT").map_or_else(
        |_| 8080,
        |p| p.parse::<u16>().expect("Bad API_PORT value"),
    );

    println!("🚀 Server started successfully");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method()
            .expose_any_header();
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(check_health)
            .service(get_configurations)
            .service(get_configuration_by_id)
            .service(post_configuration)
            .service(delete_configuration)
            .service(update_configuration)
            .service(post_anonymize)
            .service(get_anonymizations)
            .service(delete_anonymization)
            .service(get_anonymization_by_name)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
