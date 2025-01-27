import React from "react";
import Image from "next/image";

type Props = React.ComponentProps<typeof Image>;

export const MyCustomImage = (props: Props) => {
  // i want to do something here
  return <Image {...props} alt={props.alt} />;
};
