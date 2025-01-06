// the course provided api was not working - so I created it here

const seededRandom = function (seed) {
  if (typeof seed === 'string') {
    seed = new Date(seed).getTime();
  }
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
      return (s = s * a % m) / m;
  };
}

const fetchAPI = function(date) {
  return new Promise((resolve) => {
    let result = [];
    let random = seededRandom(date);
    for(let i = 17; i <= 23; i++) {
        const randValue = random();
        if(randValue < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    resolve(result);
  });
};

const submitAPI = function(formData) {
  return true;
};

const api = {
  fetchAPI: fetchAPI,
  submitAPI: submitAPI,
};

export default api;