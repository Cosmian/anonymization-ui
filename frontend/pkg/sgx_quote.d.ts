/* tslint:disable */
/* eslint-disable */
/**
*/
export class Quote {
/**
** Return copy of self without private attributes.
*/
  toJSON(): Object;
/**
* Return stringified version of self.
*/
  toString(): string;
  free(): void;
/**
* @param {Uint8Array} raw_quote
*/
  constructor(raw_quote: Uint8Array);
/**
* @param {Uint8Array} pem_certificate
* @returns {Quote}
*/
  static from_pem_certificate(pem_certificate: Uint8Array): Quote;
/**
*/
  header: QuoteHeader;
/**
*/
  report_body: ReportBody;
}
/**
*/
export class QuoteHeader {
/**
** Return copy of self without private attributes.
*/
  toJSON(): Object;
/**
* Return stringified version of self.
*/
  toString(): string;
  free(): void;
/**
*/
  att_key_type: number;
/**
*/
  pce_svn: number;
/**
*/
  qe_svn: number;
/**
*/
  reserved: number;
/**
*/
  user_data: Uint8Array;
/**
*/
  vendor_id: Uint8Array;
/**
*/
  version: number;
}
/**
*/
export class ReportBody {
/**
** Return copy of self without private attributes.
*/
  toJSON(): Object;
/**
* Return stringified version of self.
*/
  toString(): string;
  free(): void;
/**
*/
  config_id: Uint8Array;
/**
*/
  config_svn: number;
/**
*/
  cpu_svn: Uint8Array;
/**
*/
  flags: bigint;
/**
*/
  isv_ext_prod_id: Uint8Array;
/**
*/
  isv_family_id: Uint8Array;
/**
*/
  isv_prod_id: number;
/**
*/
  isv_svn: number;
/**
*/
  misc_select: number;
/**
*/
  mr_enclave: Uint8Array;
/**
*/
  mr_signer: Uint8Array;
/**
*/
  report_data: Uint8Array;
/**
*/
  reserved1: Uint8Array;
/**
*/
  reserved2: Uint8Array;
/**
*/
  reserved3: Uint8Array;
/**
*/
  reserved4: Uint8Array;
/**
*/
  xfrm: bigint;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_quoteheader_free: (a: number) => void;
  readonly __wbg_get_quoteheader_version: (a: number) => number;
  readonly __wbg_set_quoteheader_version: (a: number, b: number) => void;
  readonly __wbg_get_quoteheader_att_key_type: (a: number) => number;
  readonly __wbg_set_quoteheader_att_key_type: (a: number, b: number) => void;
  readonly __wbg_get_quoteheader_reserved: (a: number) => number;
  readonly __wbg_set_quoteheader_reserved: (a: number, b: number) => void;
  readonly __wbg_get_quoteheader_qe_svn: (a: number) => number;
  readonly __wbg_set_quoteheader_qe_svn: (a: number, b: number) => void;
  readonly __wbg_get_quoteheader_pce_svn: (a: number) => number;
  readonly __wbg_set_quoteheader_pce_svn: (a: number, b: number) => void;
  readonly __wbg_get_quoteheader_vendor_id: (a: number, b: number) => void;
  readonly __wbg_set_quoteheader_vendor_id: (a: number, b: number, c: number) => void;
  readonly __wbg_get_quoteheader_user_data: (a: number, b: number) => void;
  readonly __wbg_set_quoteheader_user_data: (a: number, b: number, c: number) => void;
  readonly __wbg_reportbody_free: (a: number) => void;
  readonly __wbg_get_reportbody_cpu_svn: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_cpu_svn: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_misc_select: (a: number) => number;
  readonly __wbg_set_reportbody_misc_select: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_reserved1: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_reserved1: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_isv_ext_prod_id: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_isv_ext_prod_id: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_flags: (a: number) => number;
  readonly __wbg_set_reportbody_flags: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_xfrm: (a: number) => number;
  readonly __wbg_set_reportbody_xfrm: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_mr_enclave: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_mr_enclave: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_reserved2: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_reserved2: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_mr_signer: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_mr_signer: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_reserved3: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_reserved3: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_config_id: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_config_id: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_isv_prod_id: (a: number) => number;
  readonly __wbg_set_reportbody_isv_prod_id: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_isv_svn: (a: number) => number;
  readonly __wbg_set_reportbody_isv_svn: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_config_svn: (a: number) => number;
  readonly __wbg_set_reportbody_config_svn: (a: number, b: number) => void;
  readonly __wbg_get_reportbody_reserved4: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_reserved4: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_isv_family_id: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_isv_family_id: (a: number, b: number, c: number) => void;
  readonly __wbg_get_reportbody_report_data: (a: number, b: number) => void;
  readonly __wbg_set_reportbody_report_data: (a: number, b: number, c: number) => void;
  readonly __wbg_quote_free: (a: number) => void;
  readonly __wbg_get_quote_header: (a: number) => number;
  readonly __wbg_set_quote_header: (a: number, b: number) => void;
  readonly __wbg_get_quote_report_body: (a: number) => number;
  readonly __wbg_set_quote_report_body: (a: number, b: number) => void;
  readonly quote_new: (a: number, b: number, c: number) => void;
  readonly quote_from_pem_certificate: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
