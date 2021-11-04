 import React from "react";
 import { Image } from "react-native";

 const CustomImage = ({ ...props }) => {
   return (
     <Image {...props} style={props.style}>
       {props.children}
     </Image>
   );
 };

 export default CustomImage;
