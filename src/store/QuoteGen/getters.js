'use strict';

export default {
  routeReady: state => {
    const originData = state.currentRoute.originData;
    const destinationData = state.currentRoute.destinationData;
    const optionsData = state.currentRoute.optionsData;
    
    if ((!originData.city.value && !originData.state.value && !originData.zipCode.value) && (!destinationData.city.value && !destinationData.state.value && !destinationData.zipCode.value)) return 'Must provide Route data before Generating a Quote';
    if (originData.city.value && !originData.state.value) return 'If city is provided State must also be provided';
    if (destinationData.city.value && !destinationData.state.value) return 'If city is provided State must also be provided';
    if (((!originData.city.value || !destinationData.city.value) && (!originData.zipCode.value || !destinationData.zipCode.value)) && (!optionsData.miles.HHG && !optionsData.miles.PRACT)) return 'If cities and zipcodes are not provided miles must be manually set.';
    if (originData.country === 'US') {
      if (!originData.state.value.match(/((A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))/g)) return 'Invalid US State code for Origin';
    }
    if (destinationData.country === 'US') {
      if (!destinationData.state.value.match(/((A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))/g)) return 'Invalid US State code for Destination';
    }
    return false;
  }
};
