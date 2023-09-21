import config from "../config";
export default function getFile(filename) {
  if (window.location.hostname === "localhost") {
    return `http://localhost:${config.local}/files/${filename}`;
  }
  return `${config.deploy}files/${filename}`;
}
