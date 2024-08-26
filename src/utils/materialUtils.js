
export const updateCommonMatMap = (ref, mapType, mapFile, map) => {

    if(!ref.current)
        return;

    if(ref.current.map)
       return;

    switch(mapType)
    {
      case "diffuse":
        ref.current.map = mapFile && map;
        break

      case "normal":
        ref.current.normalMap = mapFile && map;
        break

      case "roughness":
        ref.current.roughnessMap = mapFile && map;
        break
    }

   
}

export const updateCommonMatValue = (ref, field, value) => {

  if(!ref.current)
      return;

  switch(field)
  {
    case "envMapIntensity":
      ref.current.envMapIntensity = value;
      break;

    case "color":
      ref.current.color = value;
      break;

    case "normalMapType":
      if(!ref.current.normalMap)
         return;

      ref.current.normalMapType = value;
      break;

    case "normalScale":
        if(!ref.current.normalMap)
           return;

      ref.current.normalScale = value;
      break;

    case "roughness":
        if(!ref.current.roughnessMap)
           return;

      ref.current.roughness = value;
      break;
      
  }

}

export const updateEdgeFadeMatValue = (ref, field, value) => {

    if(!ref.current)
       return;


    switch(field)
    {
      case "edgeTransition":
          ref.current.edgeTransition = value;
        break;

      case "fadeOffset":
          ref.current.fadeOffset = value;
        break;
    }

  }