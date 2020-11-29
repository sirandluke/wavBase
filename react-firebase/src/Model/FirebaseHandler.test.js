import * as FirebaseHandler from "./FirebaseHandler";

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

test("Update node value", done => {
  let randomVal = Math.floor(Math.random() * 100);

  function callback(data) {
    try {
      expect(data).toBe(randomVal);
      done();
    } catch (error) {
      done(error);
    }
  }

  FirebaseHandler.updateUser("users/Ou1rLY45A7WYesB35btqGUxQgs82/biography", randomVal, callback);
});