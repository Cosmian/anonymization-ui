{ nixpkgs ? import <nixpkgs> {} }:
let
  inherit (nixpkgs) pkgs;

  nixPackages = [
    pkgs.nodejs-14_x
    pkgs.yarn
  ];
in
pkgs.stdenv.mkDerivation {
  name = "anonymization_ui";
  buildInputs = nixPackages;
  postInstall =
    ''
      yarn install
    '';
}