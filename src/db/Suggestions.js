'use strict';

import Papa from 'papaparse';
import Promise from 'bluebird';
import { ratingSystemURL } from '@/config/Settings';
Papa.SCRIPT_PATH = '../node_modules/papaparse/papaparse.js';

const cities = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
  K: [],
  L: [],
  M: [],
  N: [],
  O: [],
  P: [],
  Q: [],
  R: [],
  S: [],
  T: [],
  U: [],
  V: [],
  W: [],
  X: [],
  Y: [],
  Z: []
};

export function getSuggestions () {
  return new Promise((resolve, reject) => {
    function submitEntry (char, data) {
      switch (char.toUpperCase()) {
        case 'A': {
          cities.A.push(data);
          break;
        }
        case 'B': {
          cities.B.push(data);
          break;
        }
        case 'C': {
          cities.C.push(data);
          break;
        }
        case 'D': {
          cities.D.push(data);
          break;
        }
        case 'E': {
          cities.E.push(data);
          break;
        }
        case 'F': {
          cities.F.push(data);
          break;
        }
        case 'G': {
          cities.G.push(data);
          break;
        }
        case 'H': {
          cities.H.push(data);
          break;
        }
        case 'I': {
          cities.I.push(data);
          break;
        }
        case 'J': {
          cities.J.push(data);
          break;
        }
        case 'K': {
          cities.K.push(data);
          break;
        }
        case 'L': {
          cities.L.push(data);
          break;
        }
        case 'M': {
          cities.M.push(data);
          break;
        }
        case 'N': {
          cities.N.push(data);
          break;
        }
        case 'O': {
          cities.O.push(data);
          break;
        }
        case 'P': {
          cities.P.push(data);
          break;
        }
        case 'Q': {
          cities.Q.push(data);
          break;
        }
        case 'R': {
          cities.R.push(data);
          break;
        }
        case 'S': {
          cities.S.push(data);
          break;
        }
        case 'T': {
          cities.T.push(data);
          break;
        }
        case 'U': {
          cities.U.push(data);
          break;
        }
        case 'V': {
          cities.V.push(data);
          break;
        }
        case 'W': {
          cities.W.push(data);
          break;
        }
        case 'X': {
          cities.X.push(data);
          break;
        }
        case 'Y': {
          cities.Y.push(data);
          break;
        }
        case 'Z': {
          cities.Z.push(data);
          break;
        }
      }
    }

    Papa.parse(`${ratingSystemURL}/suggestions`, {
      download: true,
      header: true,
      trimHeader: true,
      step (result, parser) {
        if (result.data[0].city[0]) submitEntry(result.data[0].city[0], result.data[0]);
      },
      complete (results, file) {
        console.log('Suggestions tree built');
        resolve(cities);
      },
      error (err, file) {
        console.error('Error reading file', file);
        reject(err);
      }
    });
  });
  // console.log('init called');
}
