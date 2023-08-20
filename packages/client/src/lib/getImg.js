import config from "../config";

const placeholder = "https://picsum.photos/seed/picsum/500/500";

export default function getImg(img) {
  if (img.startsWith("http") || img.startsWith("blob")) return img;
  if (window.location.hostname === "localhost") {
    return `http://localhost:${config.local}/${img}`;
  }
  return `${config.deploy}${img}`;
}
