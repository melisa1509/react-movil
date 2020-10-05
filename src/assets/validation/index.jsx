
// function that returns true if value is email, false otherwise
export const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
        return true;
    }
    return false;
}


// function that verifies if a string has a given length or not
export const verifyLength = (value, length) => {
    if (value.length > length) {
      return true;
    }
    return false;
}
// function that verifies if two strings are equal
export const compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
}
  // function that verifies if value contains only numbers
export const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
}
// verifies if value is a valid URL
export const verifyUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
}

export const verifyChange = (event, stateName, type, stateNameEqualTo, maxValue, state) => {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (verifyLength(event.target.value, 1)) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (compare(event.target.value, state[stateNameEqualTo])) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (verifyNumber(event.target.value)) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!verifyLength(event.target.value, stateNameEqualTo + 1)) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (verifyUrl(event.target.value)) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          state.setState({ [stateName + "State"]: "success" });
        } else {
          state.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        state.setState({ [stateName]: event.target.checked });
        break;
      default:
        state.setState({ [stateName]: event.target.value });
        break;
    }
  }