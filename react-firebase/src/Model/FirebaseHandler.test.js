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

  test("Fetch repository ids", done => {
    let test = ["-MNSRGgpRojJFru31lkO", "-MNSRKdqdKb1feg9siw1"];

    function callback(data) {
      try {
        expect(data.sort()).toEqual(test.sort());
        done();
      } catch (error) {
        done(error);
      }
    }

    FirebaseHandler.findRepositories("b1CeFr3r9Ma7azib7yB9qSL0hmI3", callback);
  });

  test("Update repository value", done => {
    let randomVal = Math.floor(Math.random() * 100);

    function callback(data) {
      try {
        expect(data).toBe(randomVal);
        done();
      } catch (error) {
        done(error);
      }
    }
  
    FirebaseHandler.updateRepository("repositories/-MNSRGgpRojJFru31lkO/description", randomVal, callback);
  });