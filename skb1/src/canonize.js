export default function canonize(url) {
  const re = new RegExp("@?(https?:)?(\/\/)?([a-z]*)");
  const username = url.match(re);
  return username;
};
