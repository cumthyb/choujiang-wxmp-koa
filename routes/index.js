const {loadRouter_count}=require('./count');

const loadRoute = (router) => {
  (function (router) {
    loadRouter_count(router);
    
  })(router);
};

module.exports = {
  loadRoute,
};
