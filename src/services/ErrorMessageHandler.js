'use strict';

export function genErrorMessage (error) {
  console.log(error.code);
  console.log(error.message);
  console.log(error.stack);
  switch (error.code || error.type) {
    case 'ECONNABORTED': {
      return `Encountered an Error attempting to contact the Rating Server...`;
    }
    case 'VALERROR': {
      return error.message;
    }
    case 'AUTHERROR': {
      return 'You are not Authorized to access this area';
    }
    case 'UNAUTHORIZED': {
      return 'Login Session expired';
    }
    default: {
      if (error.message) return error.message;
      else return `An Unknown Error has occurred...`;
    }
  }
}
