export const formattingDate = (time: Date) => {
  let dd = `${time.getDate()}`;
  let mm = `${time.getMonth() + 1}`;

  const yyyy = `${time.getFullYear()}`;
  if (+dd < 10) {
    dd = 0 + dd;
  }
  if (+mm < 10) {
    mm = 0 + mm;
  }
  return `${dd  }.${  mm  }.${  yyyy}`;
};
