import config from '../config';

export default function getImg(img) {
  if(img.startsWith('http')) return img;
  if(window.location.hostname === 'localhost') return `http://localhost:${config.local}/${img}`;
    return `${config.deploy}${img}`;
}