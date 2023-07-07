use std::io::prelude::*;
use std::fs::File;
use std::env;

use actix_cors::Cors;
use actix_web::{middleware::Logger, web::{Path, self}, HttpRequest};
use actix_web::{get, post, delete, App, HttpResponse, HttpServer};
use reqwest::{Client, StatusCode};
use backend::error::AnonymizationError;
use dotenv::dotenv;

#[get("/api/configurations")]
async fn get_configurations(reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let url = format!("{}/configurations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.get(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[get("/api/configurations/{configuration_id}")]
async fn get_configuration_by_id(
    configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>
) ->  Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/configurations/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let response = reqwest_client.get(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[post("/api/configurations")]
async fn post_configuration(req_body: String, request: HttpRequest, reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let content_type = request.headers().get("content-type").ok_or_else(|| AnonymizationError::InvalidRequest("Missing content-type".to_string()))?;
    let url = format!("{}/configurations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.post(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[delete("/api/configurations/{configuration_id}")]
async fn delete_configuration(
    configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/configurations/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let response = reqwest_client.delete(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[post("/api/anonymize/{configuration_id}")]
async fn post_anonymize(req_body: String, request: HttpRequest, configuration_id: Path<(String,)>, reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let configuration_id = configuration_id.to_owned().0;
    let url = format!("{}/anonymize/{}", env::var("MICROSERVICE_URL")?, configuration_id);
    let content_type = request.headers().get("content-type").ok_or_else(|| AnonymizationError::InvalidRequest("Missing content-type".to_string()))?;
    let response = reqwest_client.post(url)
        .header("Content-Type", content_type)
        .body(req_body)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[get("/api/anonymizations")]
async fn get_anonymizations(reqwest_client: web::Data<Client>) -> Result<HttpResponse, AnonymizationError> {
    let url = format!("{}/anonymizations", env::var("MICROSERVICE_URL")?);
    let response = reqwest_client.get(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[delete("/api/anonymizations/{anonymization_name}")]
async fn delete_anonymization(
    anonymization_name: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let anonymization_name = anonymization_name.to_owned().0;
    let url = format!("{}/anonymizations/{}", env::var("MICROSERVICE_URL")?, anonymization_name);
    let response = reqwest_client.delete(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

#[get("/api/anonymizations/{anonymization_name}")]
async fn get_anonymization_by_name(
    anonymization_name: Path<(String,)>, reqwest_client: web::Data<Client>
) -> Result<HttpResponse, AnonymizationError> {
    let anonymization_name = anonymization_name.to_owned().0;
    let url = format!("{}/anonymizations/{}", env::var("MICROSERVICE_URL")?, anonymization_name);
    let response = reqwest_client.get(url)
        .send().await?;

    return match response.status() {
        StatusCode::OK => Ok(HttpResponse::Ok().body(response.text().await?)),
        StatusCode::BAD_REQUEST => Err(AnonymizationError::InvalidRequest(response.text().await?)),
        StatusCode::NOT_FOUND =>  Err(AnonymizationError::ItemNotFound(response.text().await?)),
        _ => Err(AnonymizationError::ServerError(response.text().await?)),
    };
}

pub fn instantiate_reqwest_client() -> Result<Client, AnonymizationError> {
    let mut cert_file = File::open(env::var("MICROSERVICE_CERT_PATH")?)?;
    let mut cert_buffer = Vec::new();
    cert_file.read_to_end(&mut cert_buffer)?;
    let client = Client::builder()
        .danger_accept_invalid_certs(true)
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

    println!("🚀 Server started successfully");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method()
            .expose_any_header();
        App::new()
            .app_data(web::Data::new(client.clone()))
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
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
