beforeEach(function () {
  jasmine.addMatchers({
    toBeStatusExists: function () {
      return {
        compare: function (actual, expected) {
          var currentMessage = actual;
          return {
            pass: currentMessage != null &&currentMessage.getStatus().indexOf(expected) > -1
          };
        }
      };
    }
  });
});
