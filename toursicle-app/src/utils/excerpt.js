export const excerpt = (txt, count) => {
    if(txt.length > count){
        txt = txt.substring(0, count) + "...";
    }
    return txt;
};