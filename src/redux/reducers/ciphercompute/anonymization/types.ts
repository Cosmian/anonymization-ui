import { Action } from "redux"

// ----------------------------------
//          Redux types             /
// ----------------------------------

export const GET_ANONYMIZATIONS = "GET_ANONYMIZATIONS"
export interface GetAnonymizationsAction extends Action<typeof GET_ANONYMIZATIONS> {
  data: Anonymization[]
}
export const LOAD_ANONYMIZATIONS = "LOAD_ANONYMIZATIONS"
export type LoadAnonymizationsAction = Action<typeof LOAD_ANONYMIZATIONS>

export const ADD_ANONYMIZATIONS = "ADD_ANONYMIZATIONS"
export interface AddAnonymizationsAction extends Action<typeof ADD_ANONYMIZATIONS> {
  data: Anonymization[]
}
export const GET_ONE_ANONYMIZATION = "GET_ONE_ANONYMIZATION"
export interface GetOneAnonymizationAction extends Action<typeof GET_ONE_ANONYMIZATION> {
  obj: Anonymization
}
export const UPDATE_ANONYMIZATIONS = "UPDATE_ANONYMIZATIONS"
export interface UpdateAnonymizationsAction extends Action<typeof UPDATE_ANONYMIZATIONS> {
  data: Anonymization[]
  obj: Anonymization
}
export const DELETE_ANONYMIZATIONS = "DELETE_ANONYMIZATIONS"
export interface DeleteAnonymizationsAction extends Action<typeof DELETE_ANONYMIZATIONS> {
  data: Anonymization[]
}
export const DUPLICATE_ANONYMIZATIONS = "DUPLICATE_ANONYMIZATIONS"
export interface DuplicateAnonymizationsAction extends Action<typeof DUPLICATE_ANONYMIZATIONS> {
  data: Anonymization[]
}
export const CLEAN_ANONYMIZATION_DETAILS = "CLEAN_ANONYMIZATION_DETAILS"
export type CleanAnonymizationDetailsAction = Action<typeof CLEAN_ANONYMIZATION_DETAILS>

export type AnonymizationActions =
  | AddAnonymizationsAction
  | LoadAnonymizationsAction
  | GetAnonymizationsAction
  | GetOneAnonymizationAction
  | UpdateAnonymizationsAction
  | DeleteAnonymizationsAction
  | DuplicateAnonymizationsAction
  | CleanAnonymizationDetailsAction

// ---------------------------------------
//          Anonymization types            /
// ---------------------------------------

export interface Anonymization {
  uuid: string
  name: string
  description?: string
  created_at: string
  input_dataset: InputDataset
}

export interface InputDataset {
  dataset_metadata: Metadata[]
  file_info: FileInfo
}
export interface FileInfo {
  last_modified: number
  name: string
  size: number
  type: string
}
export interface Metadata {
  key: number
  name: string
  type: DataType
  example: string
  technique: Technique
  technique_options?: TechniqueOptions
  treated_example?: string
}

export enum DataType {
  Integer = "Integer",
  Text = "Text",
  Float = "Float",
  Date = "Date",
  Boolean = "Boolean",
}

// TECHNIQUES

export enum Technique {
  None = "None",
  Hash = "Hash",
  Aggregate = "Aggregate",
  AddNoise = "AddNoise",
  BlockWords = "BlockWords",
}

export type TechniqueOptions = Hash | Aggregate | AddNoise | BlockWords

export type Hash = {
  hash_function: HashFunction
  salt?: string
}
export enum HashFunction {
  SHA256 = "SHA256",
  PBKDF2 = "PBKDF2",
}

export type Aggregate = {
  aggregation_type: AggregationType
  precision: PrecisionType | number
}
export enum AggregationType {
  Round = "Round",
  GroupByInterval = "GroupByInterval",
}
export enum PrecisionType {
  Year = "Year",
  Month = "Month",
  Day = "Day",
  Hour = "Hour",
  Minute = "Minute",
  Second = "Second",
}

export type AddNoise = {
  noise_type: NoiseType
  standard_deviation: number
  precision_type?: PrecisionType
}
export enum NoiseType {
  Gaussian = "Gaussian",
  Laplace = "Laplace",
}

export type BlockWords = {
  block_type: BlockType
  word_list: string[]
}
export enum BlockType {
  Mask = "Mask",
  Tokenize = "Tokenize",
}
