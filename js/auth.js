(function(){
"use strict";const $=FRCUI.$;
const lf=$("#login-form");if(lf)lf.addEventListener("submit",e=>{e.preventDefault();const email=$("#login-email").value.trim().toLowerCase(),password=$("#login-password").value,role=$("#login-role").value;const u=FRC.getUsers().find(x=>x.email.toLowerCase()===email&&x.password===password&&x.role===role);if(!u){FRCUI.message($("#login-message"),"Invalid email, password or role.",true);return;}FRC.saveSession({email:u.email,role:u.role});location.href=u.role==="Admin"?"admin.html":"dashboard.html";});
const rf=$("#register-form");if(rf)rf.addEventListener("submit",e=>{e.preventDefault();const name=$("#reg-name").value.trim(),email=$("#reg-email").value.trim().toLowerCase(),phone=$("#reg-phone").value.trim(),role=$("#reg-role").value,organisation=$("#reg-organisation").value.trim(),locationName=$("#reg-location").value.trim(),password=$("#reg-password").value;
if(!name||!email||!phone||!role||!locationName||password.length<6){FRCUI.message($("#register-message"),"Please complete all required fields.",true);return;}
if(FRC.getUsers().some(u=>u.email.toLowerCase()===email)){FRCUI.message($("#register-message"),"This email is already registered.",true);return;}
const users=FRC.getUsers();users.push({id:FRC.makeId("u"),name,email,password,phone,role,organisation,location:locationName});
if(!FRC.saveUsers(users)){FRCUI.message($("#register-message"),"Could not save account. Check browser storage.",true);return;}
FRC.saveSession({email,role});FRCUI.message($("#register-message"),"Registration successful! Opening dashboard.");setTimeout(()=>location.href="dashboard.html",500);
});
})();