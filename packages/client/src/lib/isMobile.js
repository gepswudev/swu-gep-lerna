import swa from "./popalert";

//test is user use on mobile or not
const isMobile = (title="Mobile warning!", text="For better experience, Please use this feature on Desktop") => {
  const mobile = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  if (mobile.some((m) => navigator.userAgent.match(m))) {
    swa({
      icon: "warning",
      title: title,
      text: text,
    });
    return true;
  } else {
    return false;
  }
};

export default isMobile;