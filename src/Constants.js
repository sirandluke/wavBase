/*
    Constants.js
    All the constants used for wavBase.
    Please use these instead of typing in name to avoid typos
    and so that we can easily change messages on the fly.

    When writing a new file, please include:
    `import * as K from "<path to Constants.js>"
 */

// Name of application

/* APP NAME & LOGOS */
export const app_name = "wavBase";

export const logo_path = "Images/wavBase_logo.png"

/* RULES */
export const empty = "" // Specifies omitted fields in db.


/* FIREBASE TABLE NAMES */
export const user_tab = "users";
export const repo_tab = "repositories";
export const snapshot_tab = "snapshots"
export const proj_folder_path = "project_folder";
export const like_tab= "like";
export const comment_tab = "comment";
export const tags_tab = "tags";


/* FIREBASE REAL TIME DB PATHS */

/* FIREBASE STORAGE PATHS */
export const default_user_png = "defaults/test_user.png"
export const default_repo_png = "defaults/default_repo_thumbnail.png"

/* ERROR MESSAGES */
export const unknown_err = "Uh Oh! Something went wrong. Please try again.";

/* REPOSITORY */
export const create_repo = "Create a new repository +";
export const edit_repo = "Edit repoistory";

/* SNAPSHOT */
export const create_snapshot = "Create a new snapshot";