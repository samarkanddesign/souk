export const required = (val: string | undefined) =>
  val ? undefined : "This field can't be blank";
