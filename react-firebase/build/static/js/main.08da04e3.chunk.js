(this["webpackJsonpreact-firebase"]=this["webpackJsonpreact-firebase"]||[]).push([[0],{116:function(e,t,s){},117:function(e,t,s){},119:function(e,t,s){},120:function(e,t,s){},121:function(e,t,s){},122:function(e,t,s){},123:function(e,t,s){},124:function(e,t,s){},125:function(e,t,s){},126:function(e,t,s){},127:function(e,t,s){},134:function(e,t,s){},135:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(2),r=s.n(a),o=s(26),c=s.n(o),i=(s(84),s(19)),l=s(10),u=s(77).a.initializeApp({apiKey:"AIzaSyCAsj0sKvrY1hqtXZYS_GbPyehKPXOzZ6Y",authDomain:"wavbasedb-9a679.firebaseapp.com",databaseURL:"https://wavbasedb-9a679.firebaseio.com/",projectId:"wavbasedb-9a679",storageBucket:"wavbasedb-9a679.appspot.com",messagingSenderId:"707190956098",appId:"1:707190956098:web:88fa31bd96d13289c64ddb",measurementId:"G-C56V3L638G"}),d=(s(29),s.p+"static/media/wavBase_logo.b40fe7ab.png"),j=(s(65),s(66),s(20)),p=s(39),h=s(13),b=s(14),m=s(16),f=s(15),O=function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(){return Object(h.a)(this,s),t.apply(this,arguments)}return Object(b.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{children:Object(n.jsxs)("p",{style:{fontSize:"24px",textAlign:"center",borderBottom:"5px black"},children:[this.props.followers," followers \xb7 ",this.props.following," following"]})})}}]),s}(a.Component),x=function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(){return Object(h.a)(this,s),t.apply(this,arguments)}return Object(b.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{children:[Object(n.jsx)("h3",{style:{textAlign:"center",fontSize:"24px"},children:this.props.username}),Object(n.jsx)(O,{followers:""==e.props.followers?0:e.props.followers,following:""==e.props.followers?0:e.props.following}),Object(n.jsx)("p",{children:this.props.biography})]})}}]),s}(a.Component),g=s.p+"static/media/loader.6dd4bf27.gif",v=(s(89),function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n,a;return Object(h.a)(this,s),(n=t.call(this,e)).state={username:"",biography:"",followers:"",following:"",profile_picture_path:g},a=null===n.props.uid?u.auth().currentUser.uid:n.props.uid,n.firebaseRef=u.database().ref("users/"+a),n.storageRef=u.storage().ref(),n}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.firebaseRef.once("value",(function(t){var s=t.val();console.log(s),e.setState({username:s.username,biography:s.biography,followers:s.followers,following:s.following,profile_picture_path:s.profile_picture})})).then((function(){console.log(e.state.profile_picture_path),e.storageRef.child(e.state.profile_picture_path).getDownloadURL().then((function(e){console.log(e),document.getElementById("profile_picture").src=e})).catch((function(e){console.log(e)}))}))}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("img",{className:"user_profile_picture",id:"profile_picture",src:g,alt:"Profile Picture"}),Object(n.jsx)(x,{username:this.state.username,biography:this.state.biography,followers:this.state.followers,following:this.state.following})]})}}]),s}(a.Component));var A=function(e){var t,s,a=e.history;if(null!=u.auth().currentUser){var r=u.auth().currentUser.uid;u.database().ref("users/"+r).on("value",(function(e){t=e.val().username,s=e.val().profile_picture,t}))}var o=u.storage().ref();return void 0!==s&&o.child(s).getDownloadURL().then((function(e){var t=document.getElementById("profile_picture");null!=t&&(t.src=e);var s=document.getElementById("profile_picture2");null!=s&&(s.src=e)})),Object(n.jsxs)("div",{className:"nav_bar",children:[Object(n.jsx)("img",{src:d,className:"nav_bar_logo",alt:"wavBase Logo"}),Object(n.jsxs)("form",{className:"search_bar",children:[Object(n.jsx)("input",{className:"search_input",type:"text",placeholder:" Search",name:"search"}),Object(n.jsx)("button",{type:"submit",className:"search_btn",children:Object(n.jsx)("i",{className:"fa fa-search",children:Object(n.jsx)(i.b,{to:"/search_result",children:" "})})})]}),Object(n.jsx)("img",{id:"profile_picture2",className:"top_icon"}),Object(n.jsxs)(p.a,{id:"dropdown-item-button",title:t,variant:"success",children:[Object(n.jsx)(j.a.Item,{as:"button",onClick:function(){a.push("/profile")},children:"My Profile"}),Object(n.jsx)("br",{}),Object(n.jsx)(j.a.Item,{as:"button",onClick:function(){a.push("/")},children:"My Repositories"}),Object(n.jsx)("br",{}),Object(n.jsx)(j.a.Item,{as:"button",onClick:function(){return u.auth().signOut()},children:"Sign Out"}),Object(n.jsx)("br",{})]})]})},w="",_="Uh Oh! Something went wrong. Please try again.",y=function(){var e=new Date;return e.getMonth()+1+"-"+(e.getDate()<=10?"0"+e.getDate():e.getDate())+"-"+e.getFullYear()},N=function(){var e=new Date;return e.getMonth()+1+"-"+(e.getDate()<=10?"0"+e.getDate():e.getDate())+"-"+e.getFullYear()+"-"+e.getHours()+"-"+e.getMinutes()+"-"+e.getSeconds()};u.database().ref();s(98);var k=function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={repos:[]},n.user_id=n.props.uid,console.log(n.user_id),n.firebaseRef=u.database().ref("repositories"),n}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this;try{this.firebaseRef.orderByChild("user_id").equalTo(this.user_id).once("value",(function(t){var s=[];t.forEach((function(e){var t=e.val();t.repo_id=e.key,s.push(t)})),e.setState({repos:s})})).then((function(){console.log(e.state.repos)}))}catch(t){console.log(t.message)}}},{key:"redirectToRepo",value:function(e){this.props.history.push({pathname:"/repository",state:{repo:e}})}},{key:"render",value:function(){var e=this,t=this.state.repos.map((function(t){return Object(n.jsx)("tr",{children:Object(n.jsx)("td",{style:{width:"200px",textAlign:"left"},children:Object(n.jsx)("button",{className:"repo_button",name:"repo_links",onClick:function(){return e.redirectToRepo(t)},children:t.name})})},t.repo_id)}));return Object(n.jsx)("div",{style:{paddingTop:"20px",overflowY:"scroll",height:"65%"},children:Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{}),Object(n.jsx)("tbody",{children:t})]})})}}]),s}(a.Component),S=Object(l.f)(k),I=s.p+"static/media/sine_wave_1.2556cb16.png",B=s(48),C=s.n(B),E=(a.Component,s(116),function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={username:"",repo_name:"",bpm:"",key:"",tags:"",description:"",thumbnail_path:"",datetime:""},n.userRef=u.database().ref("users/"+n.props.repo.user_id),n.storageRef=u.storage().ref(),n}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.userRef.once("value",(function(t){var s=t.val().username;e.setState({username:s,repo_name:e.props.repo.name,bpm:e.props.repo.bpm,key:e.props.repo.key,tags:e.props.repo.tags,description:e.props.repo.description,thumbnail_path:e.props.repo.thumbnail,datetime:e.props.repo.upload_date})})).then((function(){e.storageRef.child(e.state.thumbnail_path).getDownloadURL().then((function(e){console.log(e),document.getElementById("repo_thumbnail").src=e})).catch((function(e){console.log(e)}))}))}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:"left_element",children:Object(n.jsx)("img",{className:"repo_thumbnail",id:"repo_thumbnail",src:g,alt:"Repository Thumbnail"})}),Object(n.jsxs)("div",{className:"repo_title",children:[Object(n.jsxs)("h2",{children:[this.state.username,"/",this.state.repo_name]}),Object(n.jsxs)("h3",{children:["BPM:",this.state.bpm," | Key: ",this.state.key]})]}),Object(n.jsxs)("div",{className:"repo_description",children:[Object(n.jsx)("p",{children:"Repo Description"}),Object(n.jsx)("p",{children:this.state.description})]})]})}}]),s}(a.Component)),R="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADGSURBVHgB7ZTBDYMwDEXtwACMwAiV2KeIDcoGdINuQOkEDFLUjsAILIDdkAaJAxRHUE55UuIcnNjfig3gWQGHLak4BaCbPkYLfh2iuj/PmIMj6muo+PH4QMRMl+TRl+CIVdDzYJs0wDmnU8lxoOi1ksSUVudeNClWSuL9zrAF4ozNRRGxLTmEwgvQZGGtTS3xtRUxakUKthDORN6VYxUs/SJXppX4uwIfwAfYztgHnV7Rnp08DkajgIlzh0kpebwLiK/gkfABxQs9UDKyiOoAAAAASUVORK5CYII=",U=(s(117),function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={snapshots:[]},n.fireBaseRef=u.database().ref("snapshots"),n}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this;try{console.log(this.props.repo_id),u.database().ref("snapshots").orderByChild("repo_id").equalTo(this.props.repo_id).on("value",(function(t){var s=[];console.log("here"),t.forEach((function(e){var t=e.val();t.snap_id=e.key,s.push(t)})),e.setState({snapshots:s})})).then((function(){console.log(e.state.snapshots)}))}catch(t){console.log(t)}}},{key:"redirectToSnapshots",value:function(e){this.props.history.push({pathname:"/snapshot",state:{snapshot:e,repo_name:this.props.repo_name,username:"User"}})}},{key:"render",value:function(){var e=this,t=this.state.snapshots.map((function(t){return Object(n.jsx)("tr",{children:Object(n.jsx)("td",{style:{width:"500px",textAlign:"left"},children:Object(n.jsxs)("button",{className:"snapshot_button",name:"snapshot_links",onClick:function(){return e.redirectToSnapshots(t)},children:[Object(n.jsx)("img",{className:"snaps_ico_1",src:R,alt:"snapshot_icon"}),t.description,t.datetime]})})},t.snap_id)}));return Object(n.jsx)("div",{children:Object(n.jsx)("table",{className:"snapshot_table",children:Object(n.jsx)("tbody",{className:"snapshot_body",children:t})})})}}]),s}(a.Component)),P=Object(l.f)(U),D=s(22),T=s.n(D),Q=s(41),F=s(27),L=(s(119),s(78)),M=function(e){var t=Object(a.useState)(null),s=Object(F.a)(t,2),r=s[0],o=s[1],c=Object(a.useState)(!1),i=Object(F.a)(c,2),l=i[0],d=i[1],j=Object(a.useState)(0),p=Object(F.a)(j,2),h=p[0],b=p[1];console.log("repo id is:"+e.repo_id);var m=function(){var e=Object(Q.a)(T.a.mark((function e(t){var s,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),d(!0),s=t.target.elements.snapshotDesc,n=null,e.next=6,f();case 6:return n=e.sent,e.next=9,g(n,s.value);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function f(){return O.apply(this,arguments)}function O(){return(O=Object(Q.a)(T.a.mark((function t(){var s,n,a,o,c,i,l,d;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s=[],a=3*(n=r).length,o=N(),c=1,i=T.a.mark((function t(){var r,i,j;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=d[l],x(a,c),c++,i=n[r],j=u.storage().ref("/snapshots/"+e.repo_id+"/"+o+"/"+i.name),t.next=7,j.put(i).then(Object(Q.a)(T.a.mark((function t(){var n;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return x(a,c),c++,n=u.storage().ref("/snapshots/"+e.repo_id+"/"+o),t.next=5,n.child(i.name).getMetadata().then(function(){var e=Object(Q.a)(T.a.mark((function e(t){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(a,c),c++,e.next=4,s.push(t.fullPath);case 4:console.log("Pushed: "+t.fullPath);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return t.stop()}}),t)}))));case 7:case"end":return t.stop()}}),t)})),l=0,d=Object.keys(n);case 7:if(!(l<d.length)){t.next=12;break}return t.delegateYield(i(),"t0",9);case 9:l++,t.next=7;break;case 12:return console.log(s.toString()),t.abrupt("return",s);case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(e,t){b(Math.round((t+h)/e*100))}function g(t,s){var n=y();u.database().ref("snapshots/").push({description:s,files:t.toString(),repo_id:e.repo_id,upload_date:n})}return Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"upload_title_1",children:[Object(n.jsx)("img",{className:"snaps_ico",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHuSURBVHgB7dvBTcMwFMbx95yAxK0jZIQKxBkyAgtAM0G7CTBBygSICdoOUMgIHYEbUmls7IpKTUj1cgixod9PQoKol/7j2AqyiQAAAAAAGnDTxWFuBiqmMRtzTe6nQ4ZoxcyFKfXLaxZPKXA/Atk4SaT0zP6a0O9blXqdFtnZigKl6hd6jOPYm3H6dpmvhxSoSqDzfDOi/uLsDLSKZsP8I6EAVQKx4jH5MbAjaebmPgpM/RHzOdSTKDLPFJjKJH3xVJqmDy3vIqYObFdH+hyxiu4pGHZF1frx0Iraa6AdN9fZxzmnsDSuqIo82N4te9coLEnTPOglkLPMTibEPKewJEptJvsXvAVyypJvQovEHF3t/+01UJHx+/JWpUabzL6DFBSC2qtVTAH4XkGm1LNDi9I+ryPoL0AgAQIJEEiAQIJWq1ib2f6/wggSIJAAgQQIJEAgQatVrOt/mIUC72IdQCABAgkQSIBAAgQSIJAAgQQIJEAgAQIJEEiAQAIEEiCQAIEECCRAIAECCRBIgEACBBIgkAC7OwTVERTevmUPuLLbthLIlOWCjpypnQCoBNIUP7gjk3Sk3HevH2qpBHIbu7VW6TFGct9Z63Vav35wU8L2RA7z2H4i2OOSnTBmzsYsNvbpcQOEAAAAAADa+AItMpQco4GR3wAAAABJRU5ErkJggg==",alt:"snaps_ico",align:"left",width:"30",height:"30"}),Object(n.jsx)("h2",{children:"Take a Snapshot!"})]}),Object(n.jsx)("p",{className:"upload_description",children:"Choose a project folder that you want to upload"}),Object(n.jsx)("p",{className:"upload_description",children:"You can include anything from Ableton files, FL Studio files, midi's, wav's, mp3's, and more"}),Object(n.jsxs)("form",{onSubmit:m,children:[Object(n.jsx)("label",{children:Object(n.jsx)("input",{accept:".wav, .mp3, .als, .flp, .band, .logicx",directory:"",webkitdirectory:"",type:"file",onChange:function(e){e.currentTarget.files&&o(e.currentTarget.files)},multiple:!0})}),Object(n.jsx)("br",{}),Object(n.jsx)("p",{children:"Give your snapshot a name"}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{name:"snapshotDesc",required:"required",placeholder:"Snapshot description"})}),Object(n.jsx)("br",{}),l?Object(n.jsx)(L.a,{animated:!0,now:h,label:"".concat(h,"% complete")}):Object(n.jsx)("button",{className:"upload_button_1",type:"submit",children:"Upload"})]})]})},q=(s(120),s(121),function(e){var t=e.isShowing,s=e.hide,a=e.repo_id;return t?c.a.createPortal(Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)("div",{className:"modal-overlay"}),Object(n.jsx)("div",{className:"modal-wrapper","aria-modal":!0,"aria-hidden":!0,tabIndex:-1,role:"dialog",children:Object(n.jsxs)("div",{className:"modal",children:[Object(n.jsx)("div",{className:"modal-header",children:Object(n.jsx)("button",{type:"button",className:"modal-close-button","data-dismiss":"modal","aria-label":"Close",onClick:s,children:Object(n.jsx)("span",{"aria-hidden":"true",children:"close"})})}),Object(n.jsx)(M,{repo_id:a})]})})]}),document.body):null}),Y=function(){var e=Object(a.useState)(!1),t=Object(F.a)(e,2),s=t[0],n=t[1];return{isShowing:s,toggle:function(){n(!s)}}},z=function(e){var t=e.history,s=Object(l.e)(),a=Y(),r=a.isShowing,o=a.toggle;console.log(s.state.repo);return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsx)(A,{}),Object(n.jsx)(E,{repo:s.state.repo}),Object(n.jsx)("div",{className:"line"}),Object(n.jsxs)("div",{className:"info_upload_row",children:[Object(n.jsx)("h3",{children:"Snapshots"}),Object(n.jsx)("button",{className:"upload_pop_up",onClick:o,children:"Take a Snapshot"})]}),Object(n.jsx)(q,{isShowing:r,hide:o,repo_id:s.state.repo.repo_id}),Object(n.jsx)(P,{repo_id:s.state.repo.repo_id,repo_name:s.state.repo.name}),Object(n.jsx)("button",{className:"redirect_home",onClick:function(){t.push("/")},children:"Go Back to Home!"})]})},V=function(e,t){var s,a=e.history;s=null==t.uid?u.auth().currentUser.uid:t.uid,u.database().ref("users/"+s).on("value",(function(e){e.val().username}));return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsx)(A,{}),Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)("div",{className:"col_1",children:Object(n.jsxs)("div",{className:"profile_info",children:[Object(n.jsx)(v,{uid:s}),Object(n.jsx)("div",{style:{width:"100%",height:"2px",backgroundColor:"black"}})]})}),Object(n.jsx)("div",{className:"col_2",children:Object(n.jsxs)("div",{className:"repository_lists",children:[Object(n.jsxs)("div",{className:"repository_lists_top_row",children:[Object(n.jsx)("h7",{children:"Your Repositories"}),Object(n.jsx)("button",{className:"create_repository",onClick:function(){a.push("/newrepo")},children:"Create Repository"})]}),Object(n.jsx)(S,{uid:s})]})})]})}),Object(n.jsx)("img",{src:I,style:{width:"100%",bottom:"-15%",zIndex:"-99",position:"absolute"}})]})},G=s(67),H=(s(122),function(e){var t=e.history;function s(e){return new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(e)}return window.onload=function(){var e=document.getElementById("resetPW"),t=document.getElementById("identity");e&&e.addEventListener("click",(function(){alert("resetPTFunc called"),s(t.value)&&(alert("is email"),u.auth().sendPasswordResetEmail(t.value).then((function(){alert("Password Reset Email Sent Successfully!"),console.log("Password Reset Email Sent Successfully!")})).catch((function(e){console.error(e)})))}))},Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"login_left",children:[Object(n.jsx)("img",{className:"login_logo",src:d,alt:"wavBase Logo",width:"209",height:"187"}),Object(n.jsx)("hr",{className:"separator"}),Object(n.jsx)("p",{className:"login_quote",children:"Collaborate and share with music creators all over the world!"})]}),Object(n.jsxs)("div",{className:"login_right",children:[Object(n.jsx)("h1",{className:"signIn_header",children:"Sign in to wavBase"}),Object(n.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=e.target.elements,a=n.email_or_username,r=n.password;try{if(s(a.value)){var o=a.value;u.auth().signInWithEmailAndPassword(o,r.value),t.push("/")}else{var c=a.value,i=u.database().ref("users");i.orderByChild("username").equalTo(c).on("value",(function(e){var t=e.child("email").val();u.auth().signInWithEmailAndPassword(t,r.value)})),t.push("/"),i.off()}}catch(j){var l=j.code,d=j.message;"auth/invalid-email"===l||"auth/wrong-password"===l?alert("The email or password you inputted was incorrect. Please try again."):(console.log(d),alert(_))}},children:[Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"signIn_form",id:"identity",name:"email_or_username",type:"text",required:"required",placeholder:" Username / Email"})}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"signIn_form",name:"password",type:"password",required:"required",placeholder:" Password"})}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{className:"button",type:"submit",children:"Sign in"}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{className:"button",id:"resetPW",children:"Forgot Password / Username?"}),Object(n.jsx)("hr",{className:"separator"}),Object(n.jsx)("button",{className:"signUp_button",onClick:function(){t.push("/register")},children:"Sign Up"})]})]})]})}),K=(s(123),function(e){var t=e.history;return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsxs)("div",{className:"nav_bar",children:[Object(n.jsx)("img",{src:d,className:"nav_bar_logo",alt:"wavBase Logo"}),Object(n.jsx)("button",{className:"signIn_btn",type:"submit",onClick:function(){t.push("/")},children:"Sign In"}),Object(n.jsxs)("form",{className:"search_bar",children:[Object(n.jsx)("input",{className:"search_input",type:"text",placeholder:" Search",name:"search"}),Object(n.jsx)("button",{type:"submit",className:"search_btn",children:Object(n.jsx)("i",{className:"fa fa-search"})})]})]}),Object(n.jsx)("div",{className:"register_left",children:Object(n.jsxs)("form",{className:"register_form",onSubmit:function(e){e.preventDefault();var s=e.target.elements,n=s.username,a=s.email,r=s.password,o=s.verify;if(console.log("Adding user"),console.log(r.value+"|"+o.value),r.value===o.value){console.log("Password verified.");try{!function(e,t,s){u.auth().createUserWithEmailAndPassword(s,t),u.auth().onAuthStateChanged((function(t){t&&u.database().ref("users/"+t.uid).set({username:e,email:s,first_name:w,last_name:w,biography:w,profile_picture:"defaults/test_user.png",followers:0,following:0})}))}(n.value,r.value,a.value),t.push("/")}catch(l){var c=l.code,i=l.message;"auth/weak-password"===c?alert("The password is too weak! Please Try a different one."):"auth/email-already-in-use"===c?alert("An account already exists with this email!"):"auth/invalid-email"===c?alert("Please enter a valid email address!"):(console.log(i),alert(_))}}else alert("Please make sure your password matches!")},children:[Object(n.jsxs)("label",{children:["Username ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{className:"register_input",name:"username",type:"text",required:"required",placeholder:"Username"})]}),Object(n.jsx)("br",{}),Object(n.jsxs)("label",{children:["Email ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{className:"register_input",name:"email",type:"email",required:"required",placeholder:"Email"})]}),Object(n.jsx)("br",{}),Object(n.jsxs)("label",{children:["Password ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{className:"register_input",name:"password",type:"password",required:"required",placeholder:"Password"})]}),Object(n.jsx)("br",{}),Object(n.jsxs)("label",{children:["Re-enter Password ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{className:"register_input",name:"verify",type:"password",required:"required",placeholder:"Re-enter Password"})]}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{className:"register_button",type:"submit",children:"Sign up for wavBase"})]})}),Object(n.jsxs)("div",{className:"upperRight_text",children:[Object(n.jsxs)("h1",{children:["Built for ",Object(n.jsx)("br",{})," music creators"]}),Object(n.jsxs)("p1",{children:["wavBase is a development platform designed for ",Object(n.jsx)("span",{className:"bold_text",children:"music producers"}),". From open source to collaboration, you can ",Object(n.jsx)("span",{className:"bold_text",children:"collaborate"})," with others, ",Object(n.jsx)("span",{className:"bold_text",children:"manage projects"}),", and ",Object(n.jsx)("span",{className:"bold_text",children:"share"})," your work to millions of music listeners."]})]}),Object(n.jsx)("img",{src:I,className:"bottom_wave",style:{width:"100%",height:"233",bottom:"-3rem",zIndex:"-99",position:"absolute"}})]})}),J=s(42),X=(s(124),function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).createRepo=function(e){e.preventDefault();var t=e.target.elements,s=t.repo_name,a=t.bpm,r=t.key,o=(t.tags,t.description);console.log(n.state.isPrivate),function(e,t,s,n,a){console.log("Creating a new Repository");try{var r=u.auth().currentUser.uid,o=u.database().ref("repositories/");return o.push({user_id:r,name:t,bpm:s,key:n,description:a,snapshots:w,repo_likes:0,comments:w,thumbnail:"defaults/default_repo_thumbnail.png",upload_date:y()}),o.off(),1}catch(i){i.code;var c=i.message;return console.log(c),alert(_),0}}(0,s.value,a.value,r.value,o.value)&&n.props.history.push("/")},n.handleCheck=function(e){n.setState({isPrivate:"F"===n.state.isPrivate?"T":"F"})},n.state={isPrivate:"F"},n}return Object(b.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{children:Object(n.jsxs)("form",{className:"make_repo_form",onSubmit:this.createRepo,children:[Object(n.jsx)("h1",{children:"Create Repository"}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"repo_Name",name:"repo_name",type:"text",required:"required",placeholder:"Repository name"})}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"BPM",name:"bpm",type:"number",min:"60",max:"250",required:"required",placeholder:"BPM"})}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"Name",name:"key",type:"text",required:"required",placeholder:"Key Signature"})}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"Tags",name:"tags",type:"text",placeholder:"Tags"})}),Object(n.jsx)("br",{}),Object(n.jsxs)("label",{children:["Make repository Private",Object(n.jsx)("input",{type:"checkbox",name:"isPrivate",onChange:this.handleCheck})]}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:Object(n.jsx)("textarea",{name:"description",cols:"40",rows:"5",placeholder:"Description"})}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{className:"create_button",type:"submit",children:"Create"})]})})}}]),s}(a.Component)),W=(s(125),function(e){var t,s=e.history;return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsxs)("div",{className:"nav_bar",children:[Object(n.jsx)("img",{src:d,className:"nav_bar_logo",alt:"wavBase Logo"}),Object(n.jsxs)("div",{class:"user_dropdown",children:[Object(n.jsx)("button",{class:"drop_button",children:"User"}),Object(n.jsxs)("div",{class:"dropdown_content",children:[Object(n.jsx)("a",{href:"#",onClick:function(){s.push("/profile")},children:"My Profile"}),Object(n.jsx)("a",{href:"#",onClick:function(){s.push("/repository")},children:"My Repositories"}),Object(n.jsx)("a",{href:"#",onClick:function(){return u.auth().signOut()},children:"Sign Out"})]})]}),Object(n.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADgSURBVHgBnVG5EcJAENs9AgghICAjhBAiQtMBlEAJdAAd4A6gAjrAVwF2BGQ4JCBwBSf2eDz4GX+auWB3JJ1mxeOpcyTiBTUBSCuAutQQTNRV4rKlhjDAUt0CrQEcqCZA2Is2VN9pI3GiqmKGcM0n+dvAOhmCW9WAmF2riQ0sOoZ2kiQsFQvncj5tfmNsEAQ6ImBdqgcSR+c0YTRxPGZ28tWkr743/1+pHNK24PdVetdKL56PMOwPhj0JN0v6Sm2+ztSdTSBom1St9rgmP1mugT1oolZGXFstjCfzu31FnBftqWA+stLj7AAAAABJRU5ErkJggg==",className:"down_arrow",alt:"Down Arrow"}),Object(n.jsxs)("form",{className:"search_bar",children:[Object(n.jsx)("input",(t={className:"search_input"},Object(J.a)(t,"className","type_box"),Object(J.a)(t,"type","text"),Object(J.a)(t,"placeholder"," Search"),Object(J.a)(t,"name","search"),t)),Object(n.jsx)("button",{type:"submit",children:Object(n.jsx)("i",{className:"fa fa-search"})})]})]}),Object(n.jsx)("img",{src:I,className:"bottom_wave",style:{width:"100%",height:"233",bottom:"-3rem",zIndex:"-99",position:"absolute"}}),Object(n.jsx)(X,{history:s})]})}),Z=s(59),$=s(46),ee=(s(126),function(e){var t,s,r=e.history,o=Object(a.useState)(!1),c=Object(F.a)(o,2),i=c[0],l=c[1],d=u.auth().currentUser.uid,h=u.database().ref("users/"+d);h.on("value",(function(e){e.val().username,t=e.val().profile_picture,s=e.val().email}));var b=u.storage().ref();b.child(t).getDownloadURL().then((function(e){var t=document.getElementById("profile_picture"),s=document.getElementById("profile_picture2");t.src=e,s.src=e}));return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsx)(A,{}),Object(n.jsx)(v,{uid:d}),Object(n.jsxs)("div",{children:[Object(n.jsx)(Z.a,{variant:"primary",onClick:function(){return l(!0)},children:"Edit Profile Picture"}),Object(n.jsxs)($.a,{show:i,onHide:function(){return l(!1)},children:[Object(n.jsx)($.a.Header,{closeButton:!0,children:Object(n.jsx)($.a.Title,{children:"Choose Your Profile Picture"})}),Object(n.jsx)($.a.Body,{children:Object(n.jsxs)("form",{method:"post",onSubmit:function(e){e.preventDefault();var t=document.getElementById("picture").value.split(".").pop(),s="defaults/"+d+"."+t,n=b.child(s),a=document.getElementById("picture").files[0];console.log(a),n.put(a).then((function(e){console.log("New Profile Picture Uploaded")})),h.update({profile_picture:s})},children:[Object(n.jsx)("input",{name:"file",type:"file",id:"picture",accept:"image/*"}),Object(n.jsx)("input",{name:"token",type:"hidden"}),Object(n.jsx)("input",{type:"submit",value:"submit"})]})}),Object(n.jsx)($.a.Footer,{})]})]}),Object(n.jsx)("h1",{children:"Profile"}),Object(n.jsxs)("form",{method:"post",onSubmit:function(e){e.preventDefault();var t=document.getElementById("new_username").value,s=document.getElementById("new_bio").value;""!==t&&(h.update({username:t}),console.log("New Username: "+t)),""!==s&&(h.update({first_name:s.split(" ")[0],last_name:s.split(" ")[1]}),console.log("New Bio: "+s)),document.getElementById("new_username").value="",document.getElementById("new_bio").value=""},children:[Object(n.jsxs)("label",{children:["Username ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{name:"username",type:"text",id:"new_username",placeholder:"Username"})]}),Object(n.jsx)("br",{}),Object(n.jsxs)("label",{children:["Bio ",Object(n.jsx)("br",{}),Object(n.jsx)("input",{name:"bio",type:"text",id:"new_bio",placeholder:"Bio Information"})]}),Object(n.jsx)("br",{}),Object(n.jsx)("input",{type:"submit",value:"Update"})]}),Object(n.jsx)("button",{onClick:function(){u.auth().sendPasswordResetEmail(s).then((function(){console.log("Password Reset Email sent to:"+s)})).catch((function(e){console.log("Password Reset Email not sent successfully")}))},children:"Reset Password"}),Object(n.jsxs)(p.a,{id:"dropdown-basic-button",title:"User",children:[Object(n.jsx)(j.a.Item,{as:"button",children:"My Profile"}),Object(n.jsx)(j.a.Item,{as:"button",onClick:function(){r.push("/")},children:"My Repositories"}),Object(n.jsx)(j.a.Item,{as:"button",onClick:function(){return u.auth().signOut()},children:"Sign Out"})]}),Object(n.jsx)("button",{onClick:function(){r.push("/")},children:"Go Back to Home!"})]})}),te=function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(){return Object(h.a)(this,s),t.apply(this,arguments)}return Object(b.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsxs)("h2",{children:[this.props.username,"/",this.props.repo_name,"/",this.props.snapshot_desc]}),Object(n.jsx)("h3",{children:this.props.datetime})]})}}]),s}(a.Component),se=(s(127),function(e){return Object(n.jsx)("div",{children:Object(n.jsx)("div",{className:"load_text",children:Object(n.jsxs)("h3",{className:"loading_msg","data-text":e.message,children:[Object(n.jsx)("img",{className:"loading_icon",src:g,alt:"Loading...",height:"35",width:"35"}),e.message]})})})}),ne=s(74),ae=s.n(ne),re=s(75),oe=s.n(re),ce=s(76),ie=s.n(ce),le=(s(134),function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={audio_objs:n.props.audio_objs,proj_objs:n.props.proj_objs},console.log(n.state.audio_objs),console.log(n.state.proj_objs),n}return Object(b.a)(s,[{key:"handleDownloadAll",value:function(e){var t=[];this.state.audio_objs.forEach((function(e){t.push(e)})),this.props.proj_objs.forEach((function(e){t.push(e)}));var s=new ae.a,n=0,a=this.props.snapshot_name;t.forEach((function(e){var r=e.name;console.log(e.name),oe.a.getBinaryContent(e.url,(function(e,o){if(e)throw e;s.file(r,o,{binary:!0}),++n===t.length&&s.generateAsync({type:"blob"}).then((function(e){ie()(e,a),console.log("done")}))}))}))}},{key:"render",value:function(){var e=this,t=this.state.audio_objs.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{children:[Object(n.jsx)("img",{className:"audio_ico",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC7SURBVHgB7ZU7CsJAFEWvnyKWWli4BVu3kNZSt6FNFmHlBlyArW7DRtAVWFhaaul9zBNEzHzCpAiZA4eBSbiXzAsMkHDQQTibkv3i32YXNdP8gj6qU/i8lGbQggLXXzSkSzqhGT0hYoGErzX4wwwRC+YafqV7OqB5aIltBlNdD/RFH/SIQGwFz59VyBCx4K7rAmYeEp7r3gWe2O4DCV3BnP038kVbmCNz0rM8k3M/0xEda/CN7nzDE168AV6dFj+xdpXeAAAAAElFTkSuQmCC",alt:"audio_icon",height:"20",width:"20"}),e.name]}),Object(n.jsx)("td",{children:Object(n.jsx)(C.a,{url:e.url,width:"400px",height:"50px",playing:!1,controls:!0,volume:.5,progressInterval:5e3,pip:!0})})]},e.id)})),s=this.state.proj_objs.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{style:{width:"200px",textAlign:"left"},children:[Object(n.jsx)("img",{className:"file_ico",src:R,alt:"file_icon",height:"20",width:"20"}),e.name]}),Object(n.jsx)("td",{children:Object(n.jsxs)("button",{className:"download_file_btn",children:[Object(n.jsx)("i",{className:"fa fa-download"}),Object(n.jsx)("a",{href:e.url,download:e.name,children:" Download File"})]})})]},e.id)}));return Object(n.jsxs)("div",{children:[Object(n.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(n.jsxs)("button",{className:"download_all_btn",onClick:function(){return e.handleDownloadAll()},children:[Object(n.jsx)("i",{className:"fa fa-download"}),"Download All"]}),Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{}),Object(n.jsxs)("tbody",{children:[t,s]})]})]})}}]),s}(a.Component)),ue=function(e){Object(m.a)(s,e);var t=Object(f.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={isLoading:!0,audio_objs:null,proj_objs:null},n.storageRef=u.storage().ref(),n}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this,t=this.parseFileString(),s=t[0],n=t[1];this.getObjs(s,n).then((function(t){setTimeout((function(){e.setState({isLoading:!1,audio_objs:t[0],proj_objs:t[1]})}),5e3)}))}},{key:"parseFileString",value:function(){var e=[],t=[],s=this.props.snapshot_paths.split(",");return console.log(s),s.forEach((function(s){-1!==s.indexOf(".mp3")||-1!==s.indexOf(".wav")?e.push(s):t.push(s)})),[e,t]}},{key:"getObjs",value:function(){var e=Object(Q.a)(T.a.mark((function e(t,s){var n,a,r,o=this;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],a=[],r=0,e.prev=3,e.next=6,t.forEach((function(e){o.storageRef.child(e).getDownloadURL().then((function(t){var s={id:r,name:o.getName(e),url:t};n.push(s),r++}))}));case 6:return r=0,e.next=9,s.forEach((function(e){o.storageRef.child(e).getDownloadURL().then((function(t){var s={id:r,name:o.getName(e),url:t};a.push(s),r++}))}));case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),console.log(e.t0);case 14:return e.abrupt("return",[n,a]);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t,s){return e.apply(this,arguments)}}()},{key:"getName",value:function(e){return e.split("/").slice(-1)[0]}},{key:"render",value:function(){var e=this.state,t=e.isLoading,s=e.audio_objs,a=e.proj_objs;return console.log(t),t?Object(n.jsx)(se,{message:"Getting your files!"}):Object(n.jsx)(le,{audio_objs:s,proj_objs:a,snapshot_name:this.props.snapshot_name})}}]),s}(a.Component),de=function(e){e.history;var t=Object(l.e)();return console.log(t.state.snapshot),console.log(t.state.repo_name),Object(n.jsxs)("div",{children:[Object(n.jsx)(te,{username:t.state.username,repo_name:t.state.repo_name,snapshot_desc:t.state.snapshot.description,datetime:t.state.snapshot.upload_date}),Object(n.jsx)(ue,{snapshot_paths:t.state.snapshot.files,snapshot_name:t.state.snapshot.description})]})};var je=function(e){return Object(n.jsx)("div",{children:Object(n.jsxs)(p.a,{id:"dropdown-basic-button",title:"Options",children:[Object(n.jsx)(j.a.Item,{as:"button",children:Object(n.jsx)(i.b,{to:"/search_result",children:"Users"})}),Object(n.jsx)(j.a.Item,{as:"button",children:Object(n.jsx)(i.b,{to:"/search_result/repositories",children:"Repositories"})}),Object(n.jsx)(j.a.Item,{as:"button",children:Object(n.jsx)(i.b,{to:"/search_result/tags",children:"Tags"})})]})})},pe=s(37);function he(e){var t=[];return""!==e&&null!=e&&(t=e.split(",")),t}function be(e,t){return""===e?t:fe(e,t)?e:e+","+t}function me(e,t){if(""===e)return e;if(fe(e,t)){var s=he(e),n="";return s.forEach((function(e){e!==t&&(""===n?n+=e:n=n+","+e)})),n}return e}function fe(e,t){return he(e).includes(t)}function Oe(e){return he(e).length}var xe=function(e){var t=e.username,s=e.uid,r=u.auth().currentUser.uid,o=Object(a.useState)(e.user||[]),c=Object(F.a)(o,2),l=c[0],d=c[1],j=function(e,t,s){var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uid:e,current_uid:t,type:s})};fetch("http://localhost:8000/user_info/follow?uid="+e,n).catch((function(e){return console.log(e)}))};return Object(a.useEffect)((function(){return console.log("listen to user status"),e.user||function(e){return fetch("http://localhost:8000/user_info?current_uid="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}(s).then((function(e){d(e);var t,n="defaults/test_user.png";""!==e.profile_picture&&(n=e.profile_picture),localStorage.getItem(n)?t=localStorage.getItem(n):u.storage().ref().child(n).getDownloadURL().then((function(e){t=e,localStorage.setItem(n,e)}));var a=document.getElementById(s+"user_avatar");null!=a&&(a.src=t)})),function(){console.log("stop listen to user status")}}),[e.user]),Object(n.jsx)("div",{children:Object(n.jsxs)("ul",{children:[Object(n.jsx)("img",{id:s+"user_avatar",width:30,height:30}),Object(n.jsx)("p",{id:"user_username",children:Object(n.jsx)(i.b,{to:"/user/"+s,children:t})}),s===r||fe(l.followers,r)?Object(n.jsx)(n.Fragment,{}):Object(n.jsx)("button",{onClick:function(){j(s,r,"follow");var e=l;e=Object(pe.a)(Object(pe.a)({},e),{},{followers:be(e.followers,r)}),localStorage.setItem("following",be(localStorage.getItem("following"),s)),document.getElementById(r+"following")&&(document.getElementById(r+"following").innerText=Oe(localStorage.getItem("following"))+" following"),d(e)},children:"Follow"}),s!==r&&fe(l.followers,r)?Object(n.jsx)("button",{onClick:function(){j(s,r,"unfollow");var e=l;e=Object(pe.a)(Object(pe.a)({},e),{},{followers:me(e.followers,r)}),localStorage.setItem("following",me(localStorage.getItem("following"),s)),document.getElementById(r+"following")&&(document.getElementById(r+"following").innerText=Oe(localStorage.getItem("following"))+" following"),d(e)},children:"Unfollow"}):Object(n.jsx)(n.Fragment,{})]})})};var ge=function(e){var t=document.getElementById("search_input").value,s=Object(a.useState)([]),r=Object(F.a)(s,2),o=r[0],c=r[1],i=u.auth().currentUser.uid;return Object(a.useEffect)((function(){return console.log("listen to user list"),o||u.database().ref().child("users").once("value").then((function(e){return e.val()})).catch((function(e){return console.log(e)})).then((function(e){var t=[];for(var s in e)t.push(Object(pe.a)(Object(pe.a)({},e[s]),{},{key:s}));c(t)})),function(){console.log("stop listen to user list")}}),[o]),Object(n.jsxs)("div",{children:[Object(n.jsx)("h2",{children:"User Search Result"}),o&&o.map((function(e,s){return e.username.toLowerCase().includes(t.toLowerCase())&&e.key!==i?Object(n.jsx)(xe,{id:s,uid:e.key,username:e.username}):Object(n.jsx)(n.Fragment,{})}))]})},ve=s(38),Ae=s.n(ve);var we=function(){return Object(n.jsx)(G.AuthProvider,{children:Object(n.jsx)(i.a,{children:Object(n.jsxs)("div",{children:[Object(n.jsx)(Ae.a,{exact:!0,path:"/",component:V}),Object(n.jsx)(l.a,{exact:!0,path:"/login",component:H}),Object(n.jsx)(l.a,{exact:!0,path:"/register",component:K}),Object(n.jsx)(Ae.a,{exact:!0,path:"/newrepo",component:W}),Object(n.jsx)(Ae.a,{exact:!0,path:"/repository",component:z}),Object(n.jsx)(Ae.a,{exact:!0,path:"/snapshot",component:de}),Object(n.jsx)(Ae.a,{exact:!0,path:"/profile",component:ee}),Object(n.jsx)(Ae.a,{path:"/search_result",component:je}),Object(n.jsx)(Ae.a,{exact:!0,path:"/search_result",component:ge})]})})})},_e=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,140)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;s(e),n(e),a(e),r(e),o(e)}))};c.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(we,{})}),document.getElementById("root")),_e()},29:function(e,t,s){},38:function(e,t){},65:function(e,t,s){},66:function(e,t,s){},67:function(e,t){},84:function(e,t,s){},89:function(e,t,s){},98:function(e,t,s){}},[[135,1,2]]]);
//# sourceMappingURL=main.08da04e3.chunk.js.map