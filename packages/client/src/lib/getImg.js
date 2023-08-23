/*
  This function is used to get the image from the server
*/
import config from "../config";
export default function getImg(img) {
  if (img.startsWith("http") || img.startsWith("blob")) return img;
  if (window.location.hostname === "localhost") {
    return `http://localhost:${config.local}/${img}`;
  }
  return `${config.deploy}${img}`;
}
