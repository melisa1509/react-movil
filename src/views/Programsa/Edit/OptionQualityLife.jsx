export const optionQualityLife = value => {
    if(value === "274,119" || value === "303,132" || value === "314,159" || value === "303,188" || value === "274,199" || value === "248,187" || value === "234,159" || value === "247,132"){
      return "option_quality1";
    }
    else if(value === "274,69" || value === "338,97" || value === "364,159" || value === "338,223" || value === "274,249" || value === "212,223" || value === "184,159" || value === "212,97"){
      return "option_quality2";
    }
    else if(value === "274,49" || value === "353,82" || value === "384,159" || value === "352,237" || value === "274,269" || value === "198,237" || value === "164,159" || value === "198,83"){
      return "option_quality3";
    }
    else if(value === "274,29" || value === "367,68" || value === "404,159" || value === "367,252" || value === "274,289" || value === "183,252" || value === "144,159" || value === "183,68"){
      return "option_quality4";
    }
    else if(value === "274,9" || value === "381,54" || value === "424,159" || value === "381,266" || value === "274,309" || value === "169,266" || value === "124,159" || value === "169,54"){
      return "option_quality5";
    }
}