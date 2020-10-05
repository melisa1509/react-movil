import { SET_DATA, ADD_ARTICLE, DATA_REQUESTED, SAVE_COURSE } from 'constants/actionTypes.jsx';

export const setData = value => ({ type: SET_DATA, value: value });

export const addArticle = payload => ({ type: ADD_ARTICLE, payload: payload });

export const getDataApi = () => ({ type: DATA_REQUESTED })

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE1Nzg0ODk0NTcsImV4cCI6MTU3ODQ5MzA1Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibW9ycmlzMjYwNjgyIn0.AOXU0g8Uxkss4S7CNuMjFPQvaLgsbzped3Cf3_W6l9FaMF-KOSSCgsMn1GRxzrhObLtvgqyIJPlxyc90tulovRrIGFaca1fYlpPwP0B97IpIMsykR43YIR-8Zor0gXQ670ZpvRhbAEjhB-xXGQoiBrPkTeouO4ihu8o2nYtl41UZzg3nOz9xzstI2R5sSMBK6yXTU-qH8i-FZeUrvsWT98DtZ2iHZLik30TW0zdvoGsdnEn2dmFIiJ9MJfd2-ybbNmbyjJDNMUOYJgvAJlGHGWatzHPs8MJzfrxWJp5V4NLuvV-itWGkzYqGEzf45Yfg1rPnN4Mb7d3PPUPn8tHns8VAUWS-B4P6n1gG9T8jYKMANxfxOj-R6nAuAP8GxP7iQ9HeLTbBUQAJLDv--51eN-RgrZoJ2tK8XgrFyZIZyZxYdu2m-3JAML7P1tkRNToNtGnF11cWDRdN3inZ15NWioyIJUzuczTYQeuF3WTBjKipiVStC_cPwLrC8HSuBzehwyJ_jrXRlTSnFIvUw3aDfRWCdWLXRs8kPq2se3qeZL7NHx379-t5WsR8iWW75IV7y7eV_L0h-5-xr3590zgZ1iwtL8-tHpJ2YeCCOsytB370J3H19AzSjxSWRqnROwEx-Cv0R-Q4BJx0deLWVSGvC5M2zdU-wOlH9aS5urraqwY");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const getData = key => {
    return (dispatch) => {
        return fetch("http://api.interweavesolutions.org/user/?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: "DATA_LOADED", payload: json.data });
        });
    }
    
}

export const saveCourse = () => {
    return (dispatch) => {
        return fetch("http://api.interweavesolutions.org/user/?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SAVE_COURSE, payload: json.data });
        });
    }
    
}

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
  }
};

export const resetState = () => {
  try {
    localStorage.removeItem('state');
  } catch {
  }
};
