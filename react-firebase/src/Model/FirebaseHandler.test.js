import * as FirebaseHandler from  "./FirebaseHandler";

test("Returns user id corresponding to email", done => {
    function callback(data) {
      try {
        expect(data).toBe("Ou1rLY45A7WYesB35btqGUxQgs82");
        done();
      } catch (error) {
        done(error);
      }
    }
  
    FirebaseHandler.getUserByEmail("test@ucsd.edu", callback);
  });