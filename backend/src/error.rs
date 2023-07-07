
use actix_web::{HttpResponse, HttpResponseBuilder, http};
use http::{header, StatusCode};
use thiserror::Error;
use tracing::{error, warn};

// Each error type must have a corresponding HTTP status code (see `kmip_endpoint.rs`)
#[derive(Error, Debug, Eq, PartialEq)]
pub enum AnonymizationError {
    // Internal server error
    #[error("Server Error: {0}")]
    ServerError(String),

    // Error getting env variable
    #[error("Value Error: {0}")]
    ValueError(String),

    // When a user requests an endpoint which does not exist
    #[error("Not Supported route: {0}")]
    RouteNotFound(String),

    // When a user requests an id which does not exist
    #[error("Item not found: {0}")]
    ItemNotFound(String),

    // Missing arguments in the request
    #[error("Invalid Request: {0}")]
    InvalidRequest(String),
}

impl From<std::io::Error> for AnonymizationError {
    fn from(e: std::io::Error) -> Self {
        Self::ServerError(e.to_string())
    }
}

impl From<reqwest::Error> for AnonymizationError {
    fn from(e: reqwest::Error) -> Self {
        Self::ServerError(e.to_string())
    }
}

impl From<std::env::VarError> for AnonymizationError {
    fn from(e: std::env::VarError) -> Self {
        Self::ValueError(e.to_string())
    }
}

impl actix_web::error::ResponseError for AnonymizationError {
    fn error_response(&self) -> HttpResponse {
        let status_code = self.status_code();
        let message = self.to_string();

        if status_code >= StatusCode::INTERNAL_SERVER_ERROR {
            error!("{status_code} - {message}");
        } else {
            warn!("{status_code} - {message}");
        }

        HttpResponseBuilder::new(status_code)
            .insert_header((header::CONTENT_TYPE, "text/html; charset=utf-8"))
            .body(message)
    }

    fn status_code(&self) -> StatusCode {
        match self {
            Self::RouteNotFound(_) => StatusCode::NOT_FOUND,
            Self::ServerError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::ValueError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::InvalidRequest(_) => StatusCode::UNPROCESSABLE_ENTITY,
            Self::ItemNotFound(_) => StatusCode::UNPROCESSABLE_ENTITY,
        }
    }
}
