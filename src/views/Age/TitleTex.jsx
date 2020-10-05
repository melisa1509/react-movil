import React from "react";


function TitleTex({ ...props }) {
    const { title} = props;
    return (
      <div >
        <div >
          <h4>{title}Aqui estamos</h4>
        </div>
      </div>
    );
}

export default TitleTex;