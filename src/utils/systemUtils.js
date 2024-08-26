export const resetOribitControlsView = (refObject, defaultAngle = 0) => {
       const angleInRadians = (defaultAngle * Math.PI) / 180;
       refObject.current.setAzimuthalAngle(angleInRadians); 
       refObject.current.update();    
}

export const initialNavBarColors = {
       background: "#3d52a0",
       textNormal: "text-[#d1d5db]",
       textHilight: "text-[#06b6d4]",
       textSelected: "text-[#06b6d4]"
}

export const getNavBarColors = (state) => {

       let resultNavColors = { ...initialNavBarColors };
     
         switch(state.activeRoute)
         {
           case "Application":
             resultNavColors.background = "#505236";
             resultNavColors.textNormal = "text-[#b7cfcf]";
             resultNavColors.textHilight = "text-[#cdd44f]";
             resultNavColors.textSelected = "text-[#cdd44f]";
             break;

           case "Subscription":
             resultNavColors.background = "#243436";
             resultNavColors.textNormal = "text-[#b7cfcf]";
             resultNavColors.textHilight = "text-[#90f2f2]";
             resultNavColors.textSelected = "text-[#90f2f2]";
             break;
   
           default:
            resultNavColors = { ...initialNavBarColors };
             break;
         }
         
         return resultNavColors;
}